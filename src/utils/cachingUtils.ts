import { CACHE_EXPIRATION, cache } from 'constants/github';
import type { RepoItem } from 'types/github';

export const getCachedData = (path: string): RepoItem[] | null => {
  const cacheEntry = cache[path];
  if (!cacheEntry) return null;

  const now = Date.now();
  if (now - cacheEntry.timestamp > CACHE_EXPIRATION) {
    // Cache expired, remove it
    deleteCachedData(path);
    return null;
  }

  return cacheEntry.data;
};

export const setCachedData = (path: string, data: RepoItem[]) => {
  cache[path] = {
    data,
    timestamp: Date.now(),
  };
};

export const deleteCachedData = (path: string) => {
  delete cache[path];
};
