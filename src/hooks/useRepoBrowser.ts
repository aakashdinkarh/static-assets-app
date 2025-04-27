import { useCallback, useState } from 'react';
import { deleteGithubContent, getGithubContent } from 'api/getGithubContent';
import { deleteCachedData, setCachedData } from 'utils/cachingUtils';
import { getCachedData } from 'utils/cachingUtils';
import type { RepoItem } from 'types/github';

export const useRepoBrowser = ({
  rootPath,
  currentPath,
}: {
  rootPath: string;
  currentPath: string;
}) => {
  const [items, setItems] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDirectoryContents = useCallback(
    async (path: string = rootPath) => {
      // Check cache first
      const cachedData = getCachedData(path);
      if (cachedData) {
        setItems(cachedData);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const items = await getGithubContent(path);
        // Cache the results
        setCachedData(path, items);
        setItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [rootPath]
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
    [currentPath, fetchDirectoryContents]
  );

  const handleRefresh = useCallback(() => {
    // Invalidate cache for current path and fetch fresh data
    deleteCachedData(currentPath);
    fetchDirectoryContents(currentPath);
  }, [currentPath, fetchDirectoryContents]);

  return {
    items,
    loading,
    error,
    fetchDirectoryContents,
    handleDelete,
    handleRefresh,
  };
};
