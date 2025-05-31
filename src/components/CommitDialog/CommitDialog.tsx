import { useState } from 'react';
import styles from './commitDialog.module.css';

interface CommitDialogProps {
  isOpen: boolean;
  defaultMessage?: string;
  onConfirm: (message: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function CommitDialog({
  isOpen,
  defaultMessage = '',
  onConfirm,
  onCancel,
  isLoading = false,
  errorMessage = '',
}: CommitDialogProps) {
  const [commitMessage, setCommitMessage] = useState(defaultMessage);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h4>Enter Commit Message</h4>
        <input
          type="text"
          className={styles.input}
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder="Enter a commit message"
          autoFocus
        />
        <div className={styles.actions}>
          <button 
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(commitMessage)}
            className={styles.saveButton}
            disabled={isLoading || !commitMessage.trim()}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    </div>
  );
} 