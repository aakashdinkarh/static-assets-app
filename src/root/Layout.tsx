import { Link } from 'react-router-dom';
import styles from './layout.module.css';
import './global.css';
import { Routes } from 'pages/routes.config';
// export const metadata: Metadata = {
//   title: 'GitHub Image Uploader',
//   description: 'Upload images to specific directories in GitHub repositories',
// };

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={Routes.home} className={styles.logo}>
            Static Assets
          </Link>
          <nav className={styles.nav}>
            <Link to={Routes.uploadImage} className={styles.navLink}>
              Upload Image
            </Link>
          </nav>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
