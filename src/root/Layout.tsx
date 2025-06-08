import { Link } from 'react-router-dom';
import styles from './layout.module.css';
import './global.css';
import { Routes } from 'constants/route.constant';
import { LoginWithGithubModal } from 'components/LoginWithGithubModal';
import { ModalScreen, useModalStore } from 'store/ModalStore';
import { useGithubAuthListener } from 'hooks/useGithubAuthListener';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';
import { LogoutPopup } from 'components/LogoutPopup';
import { useLogoutPopupStore } from 'store/LogoutPopupStore';
// export const metadata: Metadata = {
//   title: 'GitHub Image Uploader',
//   description: 'Upload images to specific directories in GitHub repositories',
// };

export function Layout({ children }: { children: React.ReactNode }) {
  const { openModal } = useModalStore();
  const { openPopup: openLogoutPopup } = useLogoutPopupStore();

  useGithubAuthListener();
  const { userInfo } = useGithubUserInfoStore();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={Routes.home} className={styles.logo}>
            Static Assets
          </Link>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            <Link to={Routes.uploadImage} className={styles.navLink}>
              Upload Image
            </Link>
            <Link to={Routes.repoBrowser} className={styles.navLink}>
              Browse Repository
            </Link>
          </nav>

          {/* Vertical Divider */}
          <div className={styles.verticalDivider} />

          {/* Login with GitHub */}
          {!userInfo && (
            <button
              onClick={() => openModal(ModalScreen.LoginWithGithub)}
              className={styles.githubLoginButton}
              aria-label="Login with GitHub"
              title="Login with GitHub"
            >
              <img
                width={22}
                src="https://aakashdinkarh.github.io/static_assets/images/svgs/github.svg"
                alt="GitHub"
              />
            </button>
          )}

          {userInfo && (
            <img
              width={26}
              src={userInfo.user.avatar}
              alt="User Avatar"
              title={userInfo.user.name}
              className={styles.userAvatar}
              onClick={e => {
                e.stopPropagation();
                openLogoutPopup();
              }}
            />
          )}
        </div>
      </header>

      <LoginWithGithubModal />

      <LogoutPopup />

      <div className={styles.content}>{children}</div>
    </main>
  );
}
