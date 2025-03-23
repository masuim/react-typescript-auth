import * as React from "react";
import { Button } from "../../atoms/Button/Button";
import { cn } from "../../../lib/utils";

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(({ className, loading, children, disabled, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type="submit"
      variant="default"
      disabled={loading || disabled}
      className={cn("w-full", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>送信中...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
});
