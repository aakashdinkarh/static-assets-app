import styles from './button.module.css';

export const DangerButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.dangerButton}>
      {children}
    </button>
  );
};

export const PrimaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.primaryButton}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.secondaryButton}>
      {children}
    </button>
  );
};
