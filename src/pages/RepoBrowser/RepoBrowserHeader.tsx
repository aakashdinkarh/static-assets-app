import { SecondaryButton } from 'common/Button/Button';
import { useRepoBrowser } from 'hooks/useRepoBrowser';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { Image } from 'common/Image';
import { GIT_BRANCH_LOGO } from 'constants/image.constant';

import styles from './RepoBrowser.module.css';

export const RepoBrowserHeader = () => {
  const { handleRefresh } = useRepoBrowser();

  const { isLoading, branch } = useRepoBrowserStore();

  return (
    <h1 className={styles.header}>
      Repository Browser{' '}
      {branch && (
        <>
          <SecondaryButton className={styles.branchName}>
            <Image src={GIT_BRANCH_LOGO} alt="git branch" />
            {branch}
          </SecondaryButton>
        </>
      )}
      <SecondaryButton
        disabled={isLoading}
        className={styles.refreshButton}
        onClick={handleRefresh}
      >
        🔄
      </SecondaryButton>
    </h1>
  );
};
