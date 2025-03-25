import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { logout } from "@/features/auth/services/auth";
import { clearAuthCache } from "@/features/auth/utils/cacheControl";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      logout();
      return Promise.resolve();
    },
    onSuccess: async () => {
      setUser(null);
      setIsAuthenticated(false);

      await clearAuthCache();
      navigate(PATHS.AUTH.LOGIN);
    },
  });
};
