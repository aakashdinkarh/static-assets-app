import { lazy, Suspense, useState } from 'react';
import { FilePreviewModal } from 'components/FilePreview';
import { Breadcrumb } from 'components/Breadcrumb';
import { RepoBrowserHeader } from 'pages/RepoBrowser/RepoBrowserHeader';
import { useRepoBrowser } from 'hooks/useRepoBrowser';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { RepoListItems, DeleteItemConfirmationModal } from 'components/RepoListItems/RepoListItems';
import styles from './RepoBrowser.module.css';

const Error = lazy(() =>
  import('components/RepoListItems/Error').then(module => ({ default: module.Error }))
);

export function RepoBrowser() {
  const [previewItemPath, setPreviewItemPath] = useState<string | null>(null);
  const [deleteItemPath, setDeleteItemPath] = useState<string | null>(null);

  const { handleDelete } = useRepoBrowser();
  const { error, currentPath, setCurrentPath } = useRepoBrowserStore();

  return (
    <div className={styles.container}>
      <RepoBrowserHeader />

      <Breadcrumb currentPath={currentPath} onNavigate={setCurrentPath} />

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
