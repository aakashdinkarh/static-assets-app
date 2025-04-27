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
      <span 
        className={styles.breadcrumbItem} 
        onClick={() => onNavigate('')}
        role="button"
        tabIndex={0}
      >
        root
      </span>
      {parts.map((part, index) => (
        <span key={part}>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span 
            className={styles.breadcrumbItem}
            onClick={() => onNavigate(parts.slice(0, index + 1).join('/'))}
            role="button"
            tabIndex={0}
          >
            {part}
          </span>
        </span>
      ))}
    </div>
  );
} 