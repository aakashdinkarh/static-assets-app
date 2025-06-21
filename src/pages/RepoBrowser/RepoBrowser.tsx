import { lazy, Suspense, useState } from 'react';
import { FilePreviewModal } from 'components/FilePreview';
import { Breadcrumb } from 'components/Breadcrumb';
import { useRepoBrowser } from 'hooks/useRepoBrowser';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { RepoListItems, DeleteItemConfirmationModal } from 'components/RepoListItems/RepoListItems';
import styles from './RepoBrowser.module.css';
import { SecondaryButton } from 'common/Button/Button';

const Error = lazy(() =>
  import('components/RepoListItems/Error').then(module => ({ default: module.Error }))
);

export function RepoBrowser() {
  const [previewItemPath, setPreviewItemPath] = useState<string | null>(null);
  const [deleteItemPath, setDeleteItemPath] = useState<string | null>(null);

  const { handleRefresh, handleDelete } = useRepoBrowser();
  const { isLoading, error, currentPath, setCurrentPath } = useRepoBrowserStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          Repository Browser{' '}
          <SecondaryButton
            disabled={isLoading}
            className={styles.refreshButton}
            onClick={handleRefresh}
          >
            🔄
          </SecondaryButton>
        </h1>

        <Breadcrumb currentPath={currentPath} onNavigate={setCurrentPath} />
      </div>

      {error ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Error error={error} />
        </Suspense>
      ) : (
        <RepoListItems
          setPreviewItemPath={setPreviewItemPath}
          setDeleteItemPath={setDeleteItemPath}
        />
      )}

      {previewItemPath && <FilePreviewModal previewItemPath={previewItemPath} />}

      {deleteItemPath && (
        <DeleteItemConfirmationModal deleteItemPath={deleteItemPath} handleDelete={handleDelete} />
      )}
    </div>
  );
}
