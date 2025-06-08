import type { ButtonProps } from './button.types';
import styles from './button.module.css';

export const DangerButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.dangerButton}>
      {children}
    </button>
  );
};

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.primaryButton}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.secondaryButton}>
      {children}
    </button>
  );
};

export const CrossButton = ({ children = '✕', ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.crossButton}>
      {children}
    </button>
  );
};
