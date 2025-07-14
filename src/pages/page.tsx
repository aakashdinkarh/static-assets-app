import { Link } from 'react-router-dom';
import styles from './page.module.css';
import { Routes } from 'constants/route.constant';

export function HomePage() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to the Web Repo Editor</h1>
      <hr />
      <p className={styles.description}>
        A web application that allows users to browse the contents of a GitHub repository, upload
        and update files directly from the UI, and commit changes to the repository - all through an
        intuitive interface.
      </p>
      <Link to={Routes.uploadImage} className={styles.cta}>
        Start Uploading
      </Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to={Routes.repoBrowser} className={styles.cta}>
        Repo Browser
      </Link>
    </div>
  );
}
