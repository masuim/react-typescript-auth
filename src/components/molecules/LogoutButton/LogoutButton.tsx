import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "@/lib/cookie";
import { PATHS } from "@/features/auth/constants/paths";

interface LogoutButtonProps {
  className?: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
}

export const LogoutButton = ({
  className = "",
  variant = "secondary",
}: LogoutButtonProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    removeCookie("auth_token");
    navigate(PATHS.AUTH.LOGIN);
  };

  return (
    <Button variant={variant} onClick={handleLogout} className={className}>
      ログアウト
    </Button>
  );
};
