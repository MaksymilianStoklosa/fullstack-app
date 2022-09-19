import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Error } from "ui";
import { classes } from "utils";

type InputType = "text" | "email" | "date";

interface InputProps extends Partial<ReturnType<UseFormReturn["register"]>> {
  label?: string;
  value?: string;
  defaultValue?: string | number;
  error?: any;
  name?: string;
  id?: string;
  placeholder?: string;
  type?: InputType;
  customClass?: string;
  disabled?: boolean;
  onChange?: (event?: any) => any;
  description?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      name,
      value,
      defaultValue,
      id = name,
      placeholder,
      type = "text",
      customClass,
      disabled,
      description,
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputClasses = classes(["input", error && "input--error", customClass]);

    return (
      <div className={inputClasses}>
        {label && (
          <label htmlFor={id} className={classes([description && "d-flex align-items-center"])}>
            {label}
          </label>
        )}
        <input
          {...rest}
          name={name}
          value={value}
          defaultValue={defaultValue}
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          readOnly={disabled}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          onChange={(event) => {
            onChange?.(event);
          }}
        />
        {error && <Error>{error}</Error>}
      </div>
    );
  }
);
