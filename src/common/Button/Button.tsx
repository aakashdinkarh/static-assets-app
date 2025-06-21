import type { ButtonProps } from './button.types';
import styles from './button.module.css';
import { mergeClasses } from 'utils/mergeClasses';

export const DangerButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={mergeClasses(styles.dangerButton, className)}>
      {children}
    </button>
  );
};

export const PrimaryButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={mergeClasses(styles.primaryButton, className)}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={mergeClasses(styles.secondaryButton, className)}>
      {children}
    </button>
  );
};

export const CrossButton = ({ children = '✕', className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={mergeClasses(styles.crossButton, className)}>
      {children}
    </button>
  );
};

export const ButtonLink = ({ children = '', className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={mergeClasses(styles.buttonLink, className)}>
      {children}
    </button>
  );
};
