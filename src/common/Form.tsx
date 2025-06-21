import { getValidationMessage, isInvalidField } from 'utils/form.validationMessage';

interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
  children: React.ReactNode;
  validateAll?: boolean;
  onSubmit: (data: Record<string, FormDataEntryValue>, form: HTMLFormElement) => void;
  onError?: (errors: Record<string, string>) => void;
}

export const Form = ({ children, validateAll = false, onSubmit, onError, ...props }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    if (validateAll) {
      const fields = form.elements;
      const errors: Record<string, string> = {};
      Array.from(fields).forEach(field => {
        if (isInvalidField(field)) {
          errors[field.name] = getValidationMessage(field);
        }
      });

      if (Object.keys(errors).length > 0) {
        onError?.(errors);
        return;
      }
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    onSubmit(data, form);
  };

  return (
    <form noValidate={validateAll} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};
