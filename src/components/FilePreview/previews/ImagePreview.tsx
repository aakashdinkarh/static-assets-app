import styles from './previews.module.css';
import { Image } from 'common/Image';

type ImagePreviewProps = React.ComponentProps<typeof Image>;

export function ImagePreview({ src, alt }: ImagePreviewProps) {
  return <Image src={src} alt={alt} className={styles.imagePreview} />;
}
