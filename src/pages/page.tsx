import { Link } from 'react-router-dom';
import styles from './page.module.css';
import { Routes } from 'pages/routes.config';

export function HomePage() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to GitHub Image Uploader</h1>
      <p className={styles.description}>
        A simple tool to upload images to specific directories in your GitHub repositories.
        Each upload creates a new commit with your image.
      </p>
      <Link to={Routes.uploadImage} className={styles.cta}>
        Start Uploading
      </Link>
    </div>
  );
} 