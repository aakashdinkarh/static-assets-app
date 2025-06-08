import { useCallback, useEffect } from 'react';
import { deleteGithubContent, getGithubContent } from 'api/githubContent';
import { deleteCachedData, setCachedData } from 'utils/cachingUtils';
import { getCachedData } from 'utils/cachingUtils';
import type { RepoItem } from 'types/github';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';

export const useRepoBrowser = () => {
  const { currentPath, setListItems, setIsLoading, setError } = useRepoBrowserStore();
  const isAuthenticated = !!useGithubUserInfoStore().userInfo;

  const fetchDirectoryContents = useCallback(
    async (path: string) => {
      // Check cache first
      const cachedData = getCachedData(path);
      if (cachedData) {
        setListItems(cachedData);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const items = await getGithubContent(path);
        // Cache the results
        setCachedData(path, items);
        setListItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading, setListItems]
  );

  const handleDelete = useCallback(
    async (item: RepoItem) => {
      if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) return;

      try {
        await deleteGithubContent(item.path, `Delete ${item.name} from ${currentPath}`);
        // Invalidate cache for current path after successful delete
        deleteCachedData(currentPath);
        fetchDirectoryContents(currentPath);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete item');
      }
    },
    [currentPath, fetchDirectoryContents, setError]
  );

  const handleRefresh = useCallback(() => {
    // Invalidate cache for current path and fetch fresh data
    deleteCachedData(currentPath);
    fetchDirectoryContents(`${currentPath}&refresh=true`);
  }, [currentPath, fetchDirectoryContents]);

  useEffect(() => {
    fetchDirectoryContents(currentPath);
  }, [currentPath, fetchDirectoryContents, isAuthenticated]);

  return {
    fetchDirectoryContents,
    handleDelete,
    handleRefresh,
  };
};
