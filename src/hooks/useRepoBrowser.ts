import { useCallback, useEffect } from 'react';
import { deleteGithubContent, getGithubContent } from 'api/githubContent';
import { deleteCachedData, setCachedData } from 'utils/cachingUtils';
import { getCachedData } from 'utils/cachingUtils';
import type { RepoItem } from 'types/github';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';
import { useModalStore } from 'store/ModalStore';

export const useRepoBrowser = () => {
  const { currentPath, setListItems, setIsLoading, setError } = useRepoBrowserStore();
  const isAuthenticated = !!useGithubUserInfoStore().userInfo;
  const { setModalActionsDisabled } = useModalStore();

  const fetchDirectoryContents = useCallback(
    async (path: string, refresh = false) => {
      // Check cache first
      const cachedData = getCachedData(path);
      if (cachedData && !refresh) {
        setListItems(cachedData);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const url = refresh ? `${path}&refresh=true` : path;
        const items = await getGithubContent(url);
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
      try {
        setModalActionsDisabled(true);
        // Invalidate cache for current path after successful delete
        deleteCachedData(currentPath);
        fetchDirectoryContents(currentPath);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete item');
      } finally {
        setModalActionsDisabled(false);
      }
    },
    [currentPath, fetchDirectoryContents, setError, setModalActionsDisabled]
  );

  const handleRefresh = useCallback(() => {
    // Invalidate cache for current path and fetch fresh data
    deleteCachedData(currentPath);
    fetchDirectoryContents(currentPath, true);
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
