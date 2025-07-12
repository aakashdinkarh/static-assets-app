import { useMemo } from 'react';
import { DangerButton } from 'common/Button/Button';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { ModalScreen, useModalStore } from 'store/ModalStore';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { listLoaderDummyData } from 'constants/listLoader.constant';
import { ShimmerLoader } from 'components/RepoListItems/ShimmerLoader';
import type { RepoItem } from 'types/github';
import styles from './repoListItems.module.css';
import { DUSTBIN_LOGO } from 'constants/image.constant';
import { Image } from 'common/Image';

interface RepoListItemsProps {
  setPreviewItemPath: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteItemPath: React.Dispatch<React.SetStateAction<string | null>>;
}

export const RepoListItems = ({ setPreviewItemPath, setDeleteItemPath }: RepoListItemsProps) => {
  const { listItems, isLoading, setCurrentPath } = useRepoBrowserStore();
  const { openModal } = useModalStore();

  const showConfirmDeleteModal = (itemPath: string) => {
    setDeleteItemPath(itemPath);
    openModal(ModalScreen.ConfirmationModal);
  };

  const handleNavigate = (item: RepoItem) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path);
    } else {
      setPreviewItemPath(item.path);
      openModal([ModalScreen.FilePreview]);
    }
  };

  const loaderListItems = useMemo(() => {
    return listItems.length ? listItems : listLoaderDummyData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listItems.length]);

  if (isLoading) {
    return <ShimmerLoader loaderListItems={loaderListItems} />;
  }

  return (
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
            <div className={styles.itemNameText}>{item.name}</div>
            {item.type === 'file' && item.size && (
              <span className={styles.fileSize}>({(item.size / 1024).toFixed(1)} KB)</span>
            )}
          </div>
          {item.type === 'file' && (
            <div className={styles.actions}>
              <DangerButton onClick={() => showConfirmDeleteModal(item.path)}>
                <Image height={15.5} src={DUSTBIN_LOGO} alt="dustbin" />
              </DangerButton>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const DeleteItemConfirmationModal = ({
  deleteItemPath,
  handleDelete,
}: {
  deleteItemPath: string;
  handleDelete: (item: RepoItem) => void;
}) => {
  const { listItems } = useRepoBrowserStore();

  const itemToDelete = listItems.find(item => item.path === deleteItemPath);

  if (!itemToDelete) return null;

  const message = (
    <span style={{ wordBreak: 'break-all' }}>
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
