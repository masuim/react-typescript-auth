import { Button } from "../../atoms/Button/Button";
import type { ButtonProps } from "../../atoms/Button/Button";
import { Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { theme } from "../../../config/theme";
import { forwardRef } from "react";

export interface SubmitButtonProps extends Omit<ButtonProps, "asChild"> {
  isLoading?: boolean;
  loadingText?: string;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      loadingText,
      type = "submit",
      variant = theme.button.primary,
      ...props
    },
    ref
  ) => {
    const buttonText = isLoading ? loadingText || children : children;

    return (
      <Button
        ref={ref}
        type={type}
        variant={variant}
        className={cn("w-full", className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        <span>{buttonText}</span>
      </Button>
    );
  }
);
