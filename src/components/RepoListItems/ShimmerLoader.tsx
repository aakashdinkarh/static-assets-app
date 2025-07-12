import { mergeClasses } from 'utils/mergeClasses';
import { DangerButton } from 'common/Button/Button';
import type { RepoItem } from 'types/github';
import styles from './repoListItems.module.css';

const loadingDisabledButtonStyle = {
  minHeight: '31.5px',
  minWidth: '29.95px',
};

export interface ShimmerLoaderProps extends Pick<RepoItem, 'path' | 'type'> {}

export const ShimmerLoader = ({ loaderListItems }: { loaderListItems: ShimmerLoaderProps[] }) => {
  return (
    <div className={mergeClasses(styles.itemList, styles.loadingList)}>
      {loaderListItems.map(item => (
        <div key={item.path} className={styles.item}>
          <div className={styles.itemName}>{item.type === 'dir' ? '📁 ' : '📄 '}</div>
          {item.type === 'file' && (
            <div className={styles.actions}>
              <DangerButton disabled style={loadingDisabledButtonStyle} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
