import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { authStore } from "@/features/auth/store/authStore";
import { logout } from "@/features/auth/services";
import { clearAuthCache } from "@/utils/cache/cache-control";
import { useError } from "@/hooks/useError";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = authStore();
  const { handleError, clearError } = useError();

  return useMutation({
    mutationFn: async () => {
      clearError();
      logout();
      return Promise.resolve();
    },
    onSuccess: async () => {
      setUser(null);
      setIsAuthenticated(false);

      await clearAuthCache();
      navigate(PATHS.AUTH.LOGIN);
    },
    onError: (error) => {
      handleError(error, "ログアウト");
      // エラーが発生しても、ログアウト状態にする
      setUser(null);
      setIsAuthenticated(false);
      navigate(PATHS.AUTH.LOGIN);
    },
  });
};
