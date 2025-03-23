import * as React from "react";
import { Input } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import { cn } from "../../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import type { UseFormRegister } from "react-hook-form";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisibility";
import type { AuthenticationFormBase } from "../../../types";

export interface AuthInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  name: keyof AuthenticationFormBase;
  error?: string;
  required?: boolean;
  register?: UseFormRegister<AuthenticationFormBase>;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  (
    { className, label, error, required, type, name, register, ...props },
    ref
  ) => {
    const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-4">
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>

        <div className="relative">
          <Input
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              error && "border-destructive",
              isPassword && "pr-10",
              className
            )}
            {...(register ? register(name) : { ref })}
            {...props}
          />
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword ? "パスワードを非表示" : "パスワードを表示"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);
