import type { ButtonProps } from './button.types';
import { ButtonType } from './button.types';
import { PrimaryButton, SecondaryButton, DangerButton, CrossButton } from './Button';

const Button = ({ buttonType = ButtonType.Primary, ...props }: ButtonProps) => {
  switch (buttonType) {
    case ButtonType.Secondary:
      return <SecondaryButton {...props} />;
    case ButtonType.Danger:
      return <DangerButton {...props} />;
    case ButtonType.Cross:
      return <CrossButton {...props} />;
    case ButtonType.Primary:
    default:
      return <PrimaryButton {...props} />;
  }
};

export { PrimaryButton, SecondaryButton, DangerButton, CrossButton, Button };
