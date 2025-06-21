import { Fragment } from 'react';
import { ButtonLink } from 'common/Button/Button';
import { ROOT_PATH } from 'constants/common.constant';
import styles from './breadcrumb.module.css';

interface BreadcrumbProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Breadcrumb({ currentPath, onNavigate }: BreadcrumbProps) {
  const parts = currentPath.split('/').filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  return (
    <div className={styles.breadcrumb}>
      <ButtonLink onClick={() => onNavigate(ROOT_PATH)}>root</ButtonLink>
      {parts.map((part, index) => (
        <Fragment key={part}>
          <span className={styles.breadcrumbSeparator}>/</span>
          <ButtonLink onClick={() => onNavigate(parts.slice(0, index + 1).join('/'))}>
            {part}
          </ButtonLink>
        </Fragment>
      ))}
    </div>
  );
}
