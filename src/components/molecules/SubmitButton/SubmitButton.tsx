import * as React from "react";
import { Button } from "../../atoms/Button/Button";
import { Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";
export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      loadingText,
      type = "submit",
      ...props
    },
    ref
  ) => {
    const buttonText = isLoading ? loadingText || children : children;

    return (
      <Button
        ref={ref}
        type={type}
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
