import { PrimaryButton, SecondaryButton, DangerButton } from './Button';

export { PrimaryButton, SecondaryButton, DangerButton };

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
}

export const Button = ({
  buttonType = ButtonType.Primary,
  ...props
}: {
  buttonType?: ButtonType;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  switch (buttonType) {
    case ButtonType.Secondary:
      return <SecondaryButton {...props} />;
    case ButtonType.Danger:
      return <DangerButton {...props} />;
    case ButtonType.Primary:
    default:
      return <PrimaryButton {...props} />;
  }
};
