import * as React from "react";
import { cn } from "../../../lib/utils";
import { INPUT_BASE_STYLES } from "../../../styles";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const inputId = props.id || props.name;

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(INPUT_BASE_STYLES, className)}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <div
            id={`${inputId}-error`}
            className="absolute -bottom-5 left-0 text-sm text-destructive"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);
