export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Cross = 'cross',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: ButtonType;
};
