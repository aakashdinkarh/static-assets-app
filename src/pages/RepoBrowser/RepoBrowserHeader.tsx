import { SecondaryButton } from 'common/Button/Button';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { Image } from 'common/Image';
import { GIT_BRANCH_LOGO } from 'constants/image.constant';
import { useIsMobile } from 'hooks/useIsMobile';
import { githubCompareUrl } from 'constants/github';
import styles from './RepoBrowser.module.css';

export const RepoBrowserHeader = ({ handleRefresh }: { handleRefresh: () => void }) => {
  const { isLoading, branch } = useRepoBrowserStore();
  const isMobile = useIsMobile();

  const handleBranchNameClick = () => {
    window.open(githubCompareUrl(branch!), '_blank');
  };

  if (isMobile) {
    return (
      <h2 className={styles.header}>
        Repository Browser{' '}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {branch && (
            <>
              <SecondaryButton className={styles.branchName} onClick={handleBranchNameClick}>
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
        </div>
      </h2>
    );
  }

  return (
    <h2 className={styles.header}>
      Repository Browser{' '}
      {branch && (
        <>
          <SecondaryButton className={styles.branchName} onClick={handleBranchNameClick}>
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
    </h2>
  );
};
