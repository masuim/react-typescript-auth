import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { logout } from "@/features/auth/services/auth";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      navigate(PATHS.LOGIN);
    },
  });
};
