import { useState, useEffect } from 'react';
import styles from './RepoBrowser.module.css';
import { GITHUB_CONFIG, CACHE_EXPIRATION, cache } from 'constants/github';
import type { RepoItem } from 'types/github';
import { FilePreview } from 'components/FilePreview/FilePreview';
import { Breadcrumb } from 'components/Breadcrumb/Breadcrumb';

export function RepoBrowser() {
  const [currentPath, setCurrentPath] = useState('');
  const [items, setItems] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<RepoItem | null>(null);

  const getCachedData = (path: string): RepoItem[] | null => {
    const cacheEntry = cache[path];
    if (!cacheEntry) return null;

    const now = Date.now();
    if (now - cacheEntry.timestamp > CACHE_EXPIRATION) {
      // Cache expired, remove it
      delete cache[path];
      return null;
    }

    return cacheEntry.data;
  };

  const setCachedData = (path: string, data: RepoItem[]) => {
    cache[path] = {
      data,
      timestamp: Date.now()
    };
  };

  const fetchDirectoryContents = async (path: string = '') => {
    // Check cache first
    const cachedData = getCachedData(path);
    if (cachedData) {
      setItems(cachedData);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${GITHUB_CONFIG.BASE_URL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${path}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
            'Accept': GITHUB_CONFIG.API_VERSION
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch repository contents');
      const data = await response.json();
      const items = Array.isArray(data) ? data : [data];
      
      // Cache the results
      setCachedData(path, items);
      setItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectoryContents(currentPath);
  }, [currentPath]);

  const handleNavigate = (item: RepoItem) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path);
    } else {
      // For files, show preview instead of opening in new tab
      setPreviewItem(item);
    }
  };

  const handleDelete = async (item: RepoItem) => {
    if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) return;
    
    try {
      const response = await fetch(
        `${GITHUB_CONFIG.BASE_URL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${item.path}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${GITHUB_CONFIG.TOKEN}`,
            'Accept': GITHUB_CONFIG.API_VERSION,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Delete ${item.name}`,
            sha: item.sha
          })
        }
      );
      
      if (!response.ok) throw new Error('Failed to delete item');
      
      // Invalidate cache for current path after successful delete
      delete cache[currentPath];
      fetchDirectoryContents(currentPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  const handleBack = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(parentPath);
  };

  const handleRefresh = () => {
    // Invalidate cache for current path and fetch fresh data
    delete cache[currentPath];
    fetchDirectoryContents(currentPath);
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Repository Browser</h1>
        <div className={styles.headerActions}>
          {currentPath && (
            <button onClick={handleBack} className={styles.backButton}>
              Back
            </button>
          )}
          <button onClick={handleRefresh} className={styles.refreshButton}>
            Refresh
          </button>
        </div>
        <Breadcrumb 
          currentPath={currentPath} 
          onNavigate={setCurrentPath}
        />
      </div>

      <div className={styles.itemList}>
        {items.map((item) => (
          <div key={item.path} className={styles.item}>
            <div 
              className={styles.itemName}
              onClick={() => handleNavigate(item)}
              role="button"
              tabIndex={0}
            >
              {item.type === 'dir' ? '📁 ' : '📄 '}
              {item.name}
              {item.type === 'file' && item.size && (
                <span className={styles.fileSize}>
                  ({(item.size / 1024).toFixed(1)} KB)
                </span>
              )}
            </div>
            <div className={styles.actions}>
              <button 
                onClick={() => handleDelete(item)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewItem && (
        <FilePreview 
          item={previewItem} 
          onClose={() => setPreviewItem(null)} 
        />
      )}
    </div>
  );
} 