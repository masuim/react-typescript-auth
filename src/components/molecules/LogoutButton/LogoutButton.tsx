import { Button } from "src/components/atoms/LinkAndButton";
import { useAuth } from "src/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "src/lib/cookie";

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

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "",
  variant = "secondary",
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    removeCookie("auth_token");
    navigate("/login");
  };

  return (
    <Button variant={variant} onClick={handleLogout} className={className}>
      ログアウト
    </Button>
  );
};
