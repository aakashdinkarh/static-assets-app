import { useState } from 'react';
import styles from './commitDialog.module.css';
import { Modal } from 'common/Modal/Modal';

interface CommitDialogProps {
  isOpen: boolean;
  defaultMessage?: string;
  onConfirm: (message: string) => void;
  onCancel: () => void;
  errorMessage?: string | null;
}

export const CommitDialog = ({
  isOpen,
  defaultMessage = '',
  onConfirm,
  onCancel,
  errorMessage = '',
}: CommitDialogProps) => {
  const [commitMessage, setCommitMessage] = useState(defaultMessage);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Enter Commit Message"
      primaryActionLabel="Save Changes"
      secondaryActionLabel="Cancel"
      primaryActionHandler={() => onConfirm(commitMessage)}
      modalStyle={{
        minWidth: '400px',
      }}
      overrideOnClose
    >
      <input
        type="text"
        className={styles.input}
        value={commitMessage}
        onChange={e => setCommitMessage(e.target.value)}
        placeholder="Enter a commit message"
        autoFocus
      />
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </Modal>
  );
};
