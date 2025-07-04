import { useRef } from 'react';
import styles from './modal.module.css';
import { useModalStore } from 'store/ModalStore';
import { ButtonType } from 'common/Button/button.types';
import { Button, CrossButton, SecondaryButton } from 'common/Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  primaryActionHandler,
  primaryActionType = ButtonType.Primary,
  modalStyle = {
    maxWidth: '400px',
  },
  showFooter = true,
  overrideOnClose = false,
}: {
  isOpen: boolean;
  onClose?: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  primaryActionLabel: React.ReactNode;
  secondaryActionLabel: React.ReactNode;
  primaryActionHandler: () => void;
  primaryActionType?: ButtonType;
  modalStyle?: React.CSSProperties;
  showFooter?: boolean;
  overrideOnClose?: boolean;
}) => {
  const { closeModal, modalActionsDisabled } = useModalStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const handleCloseModal = () => {
    if (overrideOnClose) {
      onClose?.();
    } else {
      closeModal();
      onClose?.();
    }
  };

  const handleCloseModalWithBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalActionsDisabled) {
      e.stopPropagation();
      return;
    }

    if (overlayRef.current === e.target) {
      handleCloseModal();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={styles.modalBackgroundOverlay}
      onClick={handleCloseModalWithBackdropClick}
    >
      <dialog open className={styles.modal} style={modalStyle}>
        <div className={styles.modalContent}>
          <div className={styles.crossButtonContainer}>
            <CrossButton disabled={modalActionsDisabled} onClick={handleCloseModal} />
          </div>

          <div className={styles.modalHeader}>{title}</div>

          <div className={styles.modalBody}>{children}</div>

          {showFooter && (
            <div className={styles.modalFooter}>
              <Button
                disabled={modalActionsDisabled}
                buttonType={primaryActionType}
                onClick={primaryActionHandler}
              >
                {primaryActionLabel}
              </Button>

              <SecondaryButton disabled={modalActionsDisabled} onClick={handleCloseModal}>
                {secondaryActionLabel}
              </SecondaryButton>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};
