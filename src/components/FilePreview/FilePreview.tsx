import { ImagePreview } from './previews/ImagePreview';
import { UnsupportedPreview } from './previews/UnsupportedPreview';
import { TextContentPreview } from './previews/TextContentPreview';
import { Modal } from 'common/Modal/Modal';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { ModalScreen, useModalStore } from 'store/ModalStore';
import { useEffect } from 'react';
import { usePreviewStore } from 'store/PreviewStore';

interface FilePreviewProps {
  previewItemPath: string;
}

const isImageFile = (filename: string): boolean => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(filename);

const isJsonFile = (filename: string): boolean => filename.endsWith('.json');
const isHTMLFile = (filename: string): boolean => filename.endsWith('.html');

export const FilePreviewModal = ({ previewItemPath }: FilePreviewProps) => {
  const { listItems } = useRepoBrowserStore();
  const { modalScreen, closeModal } = useModalStore();
  const { setIsEditing } = usePreviewStore();
  const isOpen = !!modalScreen?.includes(ModalScreen.FilePreview);

  useEffect(() => {
    if (isOpen) return;

    setIsEditing(false);
  }, [isOpen, setIsEditing]);

  if (!isOpen) return null;

  const previewItem = listItems.find(item => item.path === previewItemPath)!;

  const renderPreview = () => {
    if (isImageFile(previewItem.name)) {
      return <ImagePreview src={previewItem.download_url!} alt={previewItem.name} />;
    }

    if (isJsonFile(previewItem.name)) {
      return (
        <TextContentPreview
          url={previewItem.download_url!}
          path={previewItem.path}
          sha={previewItem.sha}
          contentValidation={content => JSON.parse(content)}
        />
      );
    }

    if (isHTMLFile(previewItem.name)) {
      return (
        <TextContentPreview
          url={previewItem.download_url!}
          path={previewItem.path}
          sha={previewItem.sha}
        />
      );
    }

    return <UnsupportedPreview url={previewItem.download_url!} filename={previewItem.name} />;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={previewItem.name}
      primaryActionLabel="Save Changes"
      secondaryActionLabel="Cancel"
      primaryActionHandler={() => {}}
      modalStyle={{ maxWidth: '90vw' }}
      showFooter={false}
    >
      {renderPreview()}
    </Modal>
  );
};
