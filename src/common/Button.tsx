import styles from './button.module.css';

export const DangerButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return <button onClick={onClick} className={styles.dangerButton}>{children}</button>;
};
