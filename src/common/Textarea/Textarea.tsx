import type { TextareaHTMLAttributes } from 'react';
import styles from './textarea.module.css';

export const Textarea = ({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea className={styles.textarea} spellCheck={false} {...props} />;
};
