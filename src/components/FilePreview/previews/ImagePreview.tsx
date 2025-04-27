import styles from './previews.module.css';

interface ImagePreviewProps {
  url: string;
  alt: string;
}

export function ImagePreview({ url, alt }: ImagePreviewProps) {
  return (
    <img 
      src={url} 
      alt={alt}
      className={styles.imagePreview}
    />
  );
} 