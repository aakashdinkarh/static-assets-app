import styles from './filePreview.module.css';
import type { RepoItem } from 'types/github';
import { ImagePreview } from './previews/ImagePreview';
import { JsonPreview } from './previews/JsonPreview';
import { UnsupportedPreview } from './previews/UnsupportedPreview';

interface FilePreviewProps {
  item: RepoItem;
  onClose: () => void;
}

const isImageFile = (filename: string): boolean => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(filename);

const isJsonFile = (filename: string): boolean => filename.endsWith('.json');

export function FilePreview({ item, onClose }: FilePreviewProps) {
  if (!item.download_url) {
    return <div className={styles.error}>No preview available</div>;
  }

  const renderPreview = () => {
    if (isImageFile(item.name)) {
      return <ImagePreview url={item.download_url!} alt={item.name} />;
    }

    if (isJsonFile(item.name)) {
      return <JsonPreview url={item.download_url!} path={item.path} sha={item.sha} />;
    }

    return <UnsupportedPreview url={item.download_url!} filename={item.name} />;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{item.name}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <div className={styles.content}>{renderPreview()}</div>
      </div>
    </div>
  );
}
