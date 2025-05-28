import { useLogoutPopupStore } from 'store/LogoutPopupStore';
import styles from './logoutPopup.module.css';
import { useRef, useEffect } from 'react';
import { deleteCookie } from 'utils/cookie.util';
import { AUTHORIZATION_COOKIE_NAME } from 'utils/cookie.util';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';

export const LogoutPopup = () => {
  const { isOpen, closePopup } = useLogoutPopupStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { setUserInfo } = useGithubUserInfoStore();

  useEffect(() => {
    const eventListener = (e: MouseEvent) => {
      const isClickOutside =
        containerRef.current && !containerRef.current.contains(e.target as Node);
      if (isClickOutside && isOpen) {
        closePopup();
      }
    };
    document.addEventListener('click', eventListener);
    return () => document.removeEventListener('click', eventListener);
  }, [closePopup, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleLogout = () => {
    deleteCookie(AUTHORIZATION_COOKIE_NAME);
    setUserInfo(null);
    closePopup();
  };

  return (
    <div ref={containerRef} className={styles.popupContainer}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Confirm Logout</h2>
        <p className={styles.message}>Are you sure you want to log out of your account?</p>
        <div className={styles.buttons}>
          <button onClick={closePopup} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
