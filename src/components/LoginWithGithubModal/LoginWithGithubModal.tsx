import { useRef } from 'react';
import styles from './loginWithGithubModal.module.css';
import { useLoginWithGithubModalStore } from 'store/LoginWithGithubModalStore';
import { GITHUB_AUTH_URL } from 'constants/github';

export const LoginWithGithubModal = () => {
  const { isOpen, closeModal } = useLoginWithGithubModalStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCloseModalWithBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current === e.target) {
      closeModal();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={styles.modalBackgroundOverlay}
      onClick={handleCloseModalWithBackdropClick}
    >
      <dialog open className={styles.modal}>
        <div className={styles.modalContent}>
          <button onClick={closeModal} className={styles.crossButton}>
            ✕
          </button>

          <div className={styles.modalHeader}>Login with GitHub</div>

          <p className={styles.modalBody}>
            Login with GitHub to authorize yourself to perform actions on your repositories.
          </p>

          <div className={styles.modalFooter}>
            <button
              className={styles.githubButton}
              onClick={() => {
                window.location.href = GITHUB_AUTH_URL;
              }}
            >
              <img
                src="https://aakashdinkarh.github.io/static_assets/images/svgs/github.svg"
                alt="GitHub"
                width={22}
              />
              Continue with GitHub
            </button>

            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
