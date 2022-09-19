import React, { FunctionComponent } from "react";
import { classes } from "utils";

export type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  children: any;
  disabled?: boolean;
  onClick?: (e?: any) => void;
  type?: React.ButtonHTMLAttributes<null>["type"];
  customClass?: string;
  loading?: boolean;
  testId?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  variant = "primary",
  children,
  disabled = false,
  onClick,
  type = "button",
  loading = false,
  testId,
  customClass,
}: ButtonProps) => {
  const buttonClasses = classes(["button", `button--${variant}`, loading && "button--loading", customClass]);

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled || loading} type={type} data-testid={testId}>
      <span className="button__content">{children}</span>
    </button>
  );
};
