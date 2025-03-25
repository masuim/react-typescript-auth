/**
 * カスタマイズ可能な入力フィールドコンポーネント
 * エラー状態の表示、アクセシビリティ対応、フォーカス時のスタイリングを提供します
 */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const inputId = props.id || props.name;

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputStyles.base,
            inputStyles.shadow,
            inputStyles.focus,
            error && inputStyles.error,
            className
          )}
          autoComplete={
            type === "password"
              ? "current-password"
              : type === "email"
              ? "email"
              : undefined
          }
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

const inputStyles = {
  base: "w-full rounded-md border-[1.5px] border-gray-400 px-3 py-2",
  shadow: "shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]",
  focus:
    "focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/20 focus:border-[1.5px]",
  error:
    "border-destructive focus:border-destructive focus:ring-destructive/20",
} as const;
