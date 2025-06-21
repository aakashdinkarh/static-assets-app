import { NavLink } from 'react-router-dom';
import { Routes } from 'constants/route.constant';
import { LoginWithGithubModal } from 'components/LoginWithGithubModal';
import { ModalScreen, useModalStore } from 'store/ModalStore';
import { useGithubAuthListener } from 'hooks/useGithubAuthListener';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';
import { LogoutPopup } from 'components/LogoutPopup';
import { useLogoutPopupStore } from 'store/LogoutPopupStore';
import { GITHUB_LOGO } from 'constants/image.constant';
import { Image } from 'common/Image';
import { mergeClasses } from 'utils/mergeClasses';
import { ButtonLink } from 'common/Button/Button';
import styles from './layout.module.css';
import './global.css';

export function Layout({ children }: { children: React.ReactNode }) {
  const { openModal } = useModalStore();
  const { openPopup: openLogoutPopup } = useLogoutPopupStore();

  useGithubAuthListener();
  const { userInfo } = useGithubUserInfoStore();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <NavLink to={Routes.home} className={styles.logo}>
            Static Assets
          </NavLink>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            <NavLink
              to={Routes.uploadImage}
              className={({ isActive }) =>
                mergeClasses(styles.navLink, { [styles.activeNavLink]: isActive })
              }
            >
              Upload Image
            </NavLink>
            <NavLink
              to={Routes.repoBrowser}
              className={({ isActive }) =>
                mergeClasses(styles.navLink, { [styles.activeNavLink]: isActive })
              }
            >
              Browse Repository
            </NavLink>
          </nav>

          {/* Vertical Divider */}
          <div className={styles.verticalDivider} />

          {/* Login with GitHub */}
          {!userInfo && (
            <ButtonLink
              onClick={() => openModal(ModalScreen.LoginWithGithub)}
              className={styles.githubLoginButton}
              aria-label="Login with GitHub"
              title="Login with GitHub"
            >
              <Image src={GITHUB_LOGO} alt="GitHub" width={22} />
            </ButtonLink>
          )}

          {userInfo && (
            <Image
              src={userInfo.user.avatar}
              alt="User Avatar"
              title={userInfo.user.name}
              width={26}
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
