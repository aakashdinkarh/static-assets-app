import { useRef } from 'react';
import styles from './modal.module.css';
import { useModalStore } from 'store/ModalStore';
import { SecondaryButton, ButtonType, Button } from 'common/Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  primaryActionHandler,
  primaryActionType = ButtonType.Primary,
}: {
  isOpen: boolean;
  onClose?: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  primaryActionLabel: React.ReactNode;
  secondaryActionLabel: React.ReactNode;
  primaryActionHandler: () => void;
  primaryActionType?: ButtonType;
}) => {
  const { closeModal } = useModalStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const handleCloseModalWithBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current === e.target) {
      closeModal();
      onClose?.();
    }
  };

  const handleCloseModal = () => {
    closeModal();
    onClose?.();
  };

  return (
    <div
      ref={overlayRef}
      className={styles.modalBackgroundOverlay}
      onClick={handleCloseModalWithBackdropClick}
    >
      <dialog open className={styles.modal}>
        <div className={styles.modalContent}>
          <button onClick={handleCloseModal} className={styles.crossButton}>
            ✕
          </button>

          <div className={styles.modalHeader}>{title}</div>

          <p className={styles.modalBody}>{children}</p>

          <div className={styles.modalFooter}>
            <Button buttonType={primaryActionType} onClick={primaryActionHandler}>
              {primaryActionLabel}
            </Button>

            <SecondaryButton onClick={closeModal}>{secondaryActionLabel}</SecondaryButton>
          </div>
        </div>
      </dialog>
    </div>
  );
};
