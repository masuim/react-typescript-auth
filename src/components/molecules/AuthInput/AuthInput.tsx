import * as React from "react";
import { Input } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import { cn } from "../../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import type { UseFormRegister } from "react-hook-form";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisibility";
import type { LoginFormData, RegisterFormData } from "../../../types";

type FormData = LoginFormData & Partial<RegisterFormData>;

export interface AuthInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  name: keyof FormData;
  error?: string;
  required?: boolean;
  register?: UseFormRegister<FormData>;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
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
        {error && <p className={STYLES.error}>{error}</p>}
      </div>
    );
  }
);

interface PasswordToggleButtonProps {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({
  showPassword,
  onToggle,
}) => (
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
  container: "flex flex-col gap-4",
  error: "text-sm text-destructive",
  passwordInput: "pr-10",
  passwordButton:
    "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
  icon: "h-4 w-4 text-gray-500",
} as const;
