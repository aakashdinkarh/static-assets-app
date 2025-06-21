import { Link } from 'react-router-dom';
import styles from './page.module.css';
import { Routes } from 'constants/route.constant';

export function HomePage() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to the Static Assets App</h1>
      <hr />
      <p className={styles.description}>
        A simple tool to upload images to specific directories in your GitHub repositories. Each
        upload creates a new commit with your image.
      </p>
      <Link to={Routes.uploadImage} className={styles.cta}>
        Start Uploading
      </Link>

      <br />
      <br />
      <hr />

      <p className={styles.description}>
        A tool to browse the contents of your GitHub repositories. Additionally, you can delete/edit
        files from the repository.
      </p>
      <Link to={Routes.repoBrowser} className={styles.cta}>
        Repo Browser
      </Link>
    </div>
  );
}
