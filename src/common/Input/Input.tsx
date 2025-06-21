import type { InputHTMLAttributes } from 'react';
import styles from './input.module.css';
import { mergeClasses } from 'utils/mergeClasses';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errorMessage?: string;
  labelClassName?: string;
  inputGroupClassName?: string;
  errorClassName?: string;
}

export const Input = ({
  label,
  errorMessage,
  name,
  labelClassName,
  inputGroupClassName,
  errorClassName,
  className,
  required = true,
  ...props
}: InputProps) => {
  return (
    <div className={mergeClasses(styles.inputGroup, inputGroupClassName)}>
      <label htmlFor={name} className={mergeClasses(styles.label, labelClassName)}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        className={mergeClasses(styles.input, className)}
        required={required}
        {...props}
      />
      {errorMessage && (
        <div className={mergeClasses(styles.error, errorClassName)}>{errorMessage}</div>
      )}
    </div>
  );
};
