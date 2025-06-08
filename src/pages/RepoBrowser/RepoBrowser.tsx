import { useMemo, useState } from 'react';
import { FilePreview } from 'components/FilePreview';
import { Breadcrumb } from 'components/Breadcrumb';
import { useRepoBrowser } from 'hooks/useRepoBrowser';
import type { RepoItem } from 'types/github';
import styles from './RepoBrowser.module.css';
import { DangerButton } from 'common/Button';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { ConfirmationModal } from 'components/ConfirmationModal';
import { useModalStore, ModalScreen } from 'store/ModalStore';
import { getParentPathForCurrentPath } from 'utils/getParentPathForCurrentPath.util';

const rootPath = '/';

export function RepoBrowser() {
  const [previewItemPath, setPreviewItemPath] = useState<string | null>(null);
  const [deleteItemPath, setDeleteItemPath] = useState<string | null>(null);

  const { handleRefresh } = useRepoBrowser();
  const { listItems, isLoading, error, currentPath, setCurrentPath } = useRepoBrowserStore();
  const { openModal } = useModalStore();

  const previewItem = useMemo(
    () => listItems.find(item => item.path === previewItemPath),
    [listItems, previewItemPath]
  );

  const handleNavigate = (item: RepoItem) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path);
    } else {
      // For files, show preview instead of opening in new tab
      setPreviewItemPath(item.path);
    }
  };

  const handleBack = () => {
    const parentPath = getParentPathForCurrentPath(currentPath);
    setCurrentPath(parentPath);
  };

  const showConfirmDeleteModal = (itemPath: string) => {
    setDeleteItemPath(itemPath);
    openModal(ModalScreen.ConfirmationModal);
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
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
        <Breadcrumb rootPath={rootPath} currentPath={currentPath} onNavigate={setCurrentPath} />
      </div>

      <div className={styles.itemList}>
        {listItems.map(item => (
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
                <span className={styles.fileSize}>({(item.size / 1024).toFixed(1)} KB)</span>
              )}
            </div>
            {item.type === 'file' && (
              <div className={styles.actions}>
                <DangerButton onClick={() => showConfirmDeleteModal(item.path)}>
                  Delete
                </DangerButton>
              </div>
            )}
          </div>
        ))}
      </div>

      {previewItem && <FilePreview item={previewItem} onClose={() => setPreviewItemPath(null)} />}

      {deleteItemPath && <DeleteItemConfirmationModal deleteItemPath={deleteItemPath} />}
    </div>
  );
}

const DeleteItemConfirmationModal = ({ deleteItemPath }: { deleteItemPath: string }) => {
  const { listItems } = useRepoBrowserStore();
  const { handleDelete } = useRepoBrowser();

  const itemToDelete = listItems.find(item => item.path === deleteItemPath);

  if (!itemToDelete) return null;

  const message = (
    <span>
      Are you sure you want to delete <strong>{deleteItemPath}</strong>?
    </span>
  );

  return (
    <ConfirmationModal
      title="Delete Item"
      message={message}
      onConfirm={() => handleDelete(itemToDelete)}
    />
  );
};
