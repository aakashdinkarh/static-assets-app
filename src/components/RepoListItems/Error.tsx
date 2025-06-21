import { useState, useEffect } from 'react';
import styles from './error.module.css';

export const Error = ({ error = 'A fatal exception has occurred' }) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [glitchText, setGlitchText] = useState('Oops! Something went wrong');

  const handleRefresh = () => {
    setIsRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText('Oops! Somet_ing wen_ w_ong');
      setTimeout(() => setGlitchText('Oops! Something went wrong'), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.errorTerminal}>
      <div className={styles.scanline}></div>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtonRed}></div>
        <div className={styles.terminalButtonYellow}></div>
        <div className={styles.terminalButtonGreen}></div>
      </div>
      <div className={styles.terminalBody}>
        <pre className={styles.asciiArt}>
          {`
   /\\_/\\
  ( o.o )
   > ^ <
          `}
        </pre>
        <h3 className={styles.errorGlitch} data-text={glitchText}>
          {glitchText}
        </h3>
        <p className={styles.errorMessageTerm}>
          <span className={styles.prompt}>&gt;</span> ERROR: {error}
        </p>
        <p className={styles.errorMessageTerm}>
          <span className={styles.prompt}>&gt;</span> Press retry to reboot the system.
        </p>
        <div className={styles.errorActionsTerm}>
          <button
            className={`${styles.retryButtonTerm} ${isRetrying ? styles.retryingTerm : ''}`}
            onClick={handleRefresh}
            disabled={isRetrying}
          >
            {isRetrying ? 'REBOOTING...' : '[ RETRY ]'}
          </button>
        </div>
      </div>
    </div>
  );
};
