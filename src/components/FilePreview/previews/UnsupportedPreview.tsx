import styles from './previews.module.css';

interface UnsupportedPreviewProps {
  url: string;
  filename: string;
}

export function UnsupportedPreview({ url, filename }: UnsupportedPreviewProps) {
  return (
    <div className={styles.unsupported}>
      This file type is not supported for preview.
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.downloadLink}
      >
        Download {filename}
      </a>
    </div>
  );
} 