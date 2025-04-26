import { useState } from 'react';
import { ImageUploader } from 'components/ImageUploader';
import type { GithubUploadResponse } from 'types/github';
import styles from './page.module.css';

export function UploadPage() {
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    url?: string;
  }>({
    type: null,
    message: '',
  });

  const handleSuccess = (response: GithubUploadResponse) => {
    setStatus({
      type: 'success',
      message: response.message,
      url: response.url,
    });
  };

  const handleError = (error: string) => {
    setStatus({
      type: 'error',
      message: error,
    });
  };

  return (
    <>
      <h1 className={styles.title}>Upload Images to GitHub</h1>
      
      {status.type && (
        <div
          className={`${styles.statusMessage} ${
            status.type === 'success' ? styles.success : styles.error
          }`}
        >
          <p>{status.message}</p>
          {status.url && (
            <a
              href={status.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageLink}
            >
              View uploaded image
            </a>
          )}
        </div>
      )}

      <ImageUploader
        onSuccess={handleSuccess}
        onError={handleError}
      />

      <div className={styles.instructions}>
        <h2 className={styles.instructionsTitle}>Instructions:</h2>
        <ul className={styles.instructionsList}>
          <li>Select an image file to upload</li>
          <li>Specify the target directory in the repository (e.g., &ldquo;images/blog&rdquo;)</li>
          <li>Provide a filename for the image (e.g., &ldquo;header-image.jpg&rdquo;)</li>
          <li>The image will be committed to your configured GitHub repository</li>
        </ul>
      </div>
    </>
  );
} 