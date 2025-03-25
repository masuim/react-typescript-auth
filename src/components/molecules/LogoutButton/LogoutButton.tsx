import { Button } from "@/components/atoms/LinkAndButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "@/lib/cookie";

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
