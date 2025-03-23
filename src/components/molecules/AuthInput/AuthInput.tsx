import * as React from "react";
import { Input } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import { cn } from "../../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../atoms/Button/Button";

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, label, error, required, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        <Label htmlFor={props.id || props.name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              error && "border-destructive focus-visible:ring-destructive",
              isPassword && "pr-10",
              className
            )}
            {...props}
          />
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
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

AuthInput.displayName = "AuthInput";

export { AuthInput };
