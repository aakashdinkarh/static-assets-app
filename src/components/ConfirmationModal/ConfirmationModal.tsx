import { ModalScreen, useModalStore } from 'store/ModalStore';
import { Modal } from 'common/Modal';
import { ButtonType } from 'common/Button';

export const ConfirmationModal = ({
  onConfirm,
  title,
  message,
}: {
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
}) => {
  const { modalScreen } = useModalStore();
  const isOpen = modalScreen === ModalScreen.ConfirmationModal;

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      primaryActionLabel="DELETE"
      secondaryActionLabel="Close"
      primaryActionHandler={onConfirm}
      primaryActionType={ButtonType.Danger}
    >
      {message}
    </Modal>
  );
};
