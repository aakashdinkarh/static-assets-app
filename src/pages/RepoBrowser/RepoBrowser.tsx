import { useState, useEffect } from 'react';
import { FilePreview } from 'components/FilePreview';
import { Breadcrumb } from 'components/Breadcrumb';
import { useRepoBrowser } from 'hooks/useRepoBrowser';
import type { RepoItem } from 'types/github';
import styles from './RepoBrowser.module.css';
import { DangerButton } from 'common/Button';

const rootPath = '/';

export function RepoBrowser() {
  const [currentPath, setCurrentPath] = useState(rootPath);
  const [previewItem, setPreviewItem] = useState<RepoItem | null>(null);

  const { items, loading, error, fetchDirectoryContents, handleDelete, handleRefresh } = useRepoBrowser({
    rootPath,
    currentPath,
  });

  useEffect(() => {
    fetchDirectoryContents(currentPath);
  }, [currentPath, fetchDirectoryContents]);

  const handleNavigate = (item: RepoItem) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path);
    } else {
      // For files, show preview instead of opening in new tab
      setPreviewItem(item);
    }
  };

  const handleBack = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(parentPath);
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Repository Browser</h1>
        <div className={styles.headerActions}>
          {currentPath !== rootPath && (
            <button onClick={handleBack} className={styles.backButton}>
              Back
            </button>
          )}
          <button onClick={handleRefresh} className={styles.refreshButton}>
            Refresh
          </button>
        </div>
        <Breadcrumb 
          rootPath={rootPath}
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
              <DangerButton onClick={() => handleDelete(item)}>Delete</DangerButton>
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