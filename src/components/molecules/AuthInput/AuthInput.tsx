import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/atoms/links-and-buttons/Button";
import { Text } from "@/components/atoms/typography";
import type { UseFormRegister } from "react-hook-form";
import { usePasswordVisibility } from "@/features/auth/hooks/usePasswordVisibility";
import type { FormData } from "@/features/auth/types";

/**
 * 認証フォーム用の入力フィールドコンポーネント
 * パスワードの表示/非表示切り替え機能とエラー表示機能を提供します
 */
export interface AuthInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  name: keyof FormData;
  error?: string;
  required?: boolean;
  register?: UseFormRegister<FormData>;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    { className, label, error, required, type, name, register, ...props },
    ref
  ) => {
    const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
    const isPassword = type === "password";

    const inputType = isPassword && showPassword ? "text" : type;
    const inputClassName = cn(
      error && "border-destructive",
      isPassword && STYLES.passwordInput,
      className
    );

    return (
      <div className={STYLES.container}>
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>

        <div className="relative">
          <Input
            type={inputType}
            className={inputClassName}
            {...(register ? register(name) : { ref })}
            {...props}
          />
          {isPassword && (
            <PasswordToggleButton
              showPassword={showPassword}
              onToggle={togglePasswordVisibility}
            />
          )}
        </div>
        {error && (
          <Text variant="muted" className="text-destructive">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

interface PasswordToggleButtonProps {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordToggleButton = ({
  showPassword,
  onToggle,
}: PasswordToggleButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={STYLES.passwordButton}
    onClick={onToggle}
    aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
  >
    {showPassword ? (
      <EyeOff className={STYLES.icon} />
    ) : (
      <Eye className={STYLES.icon} />
    )}
  </Button>
);

const STYLES = {
  container: "flex flex-col gap-2",
  passwordInput: "pr-10",
  passwordButton:
    "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
  icon: "h-4 w-4 text-gray-500",
} as const;
