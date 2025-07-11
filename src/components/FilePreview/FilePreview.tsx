import { useEffect } from 'react';
import { Modal } from 'common/Modal/Modal';
import { ImagePreview } from 'components/FilePreview/previews/ImagePreview';
import { UnsupportedPreview } from 'components/FilePreview/previews/UnsupportedPreview';
import { TextContentPreview } from 'components/FilePreview/previews/TextContentPreview';
import { PDFPreview } from 'components/FilePreview/previews/PdfPreview';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { ModalScreen, useModalStore } from 'store/ModalStore';
import { usePreviewStore } from 'store/PreviewStore';
import {
  isImageFile,
  isPdfFile,
  isTextContentFile,
  getValidatorForTextContentFile,
} from 'utils/file.util';

interface FilePreviewProps {
  previewItemPath: string;
}

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

    if (isPdfFile(previewItem.name)) {
      return <PDFPreview url={previewItem.download_url!} path={previewItem.path} />;
    }

    if (isTextContentFile(previewItem.name)) {
      return (
        <TextContentPreview
          url={previewItem.download_url!}
          path={previewItem.path}
          sha={previewItem.sha}
          contentValidation={getValidatorForTextContentFile(previewItem.name)}
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
