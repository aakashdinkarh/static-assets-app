import { Link } from 'react-router-dom';
import styles from './layout.module.css';
import './global.css';
// export const metadata: Metadata = {
//   title: 'GitHub Image Uploader',
//   description: 'Upload images to specific directories in GitHub repositories',
// };

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <Link to="/" className={styles.logo}>
                Static Assets
              </Link>
              <nav className={styles.nav}>
                <Link to="/upload" className={styles.navLink}>
                  Upload Image
                </Link>
              </nav>
            </div>
          </header>
          <div className={styles.content}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
