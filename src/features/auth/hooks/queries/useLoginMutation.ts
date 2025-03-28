import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { authStore } from "@/features/auth/store/authStore";
import { login } from "@/features/auth/services";
import { useError } from "@/hooks/useError";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = authStore();
  const { handleError, clearError } = useError();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      clearError();
      return await login(email, password);
    },
    onSuccess: (user) => {
      setUser(user);
      setIsAuthenticated(true);

      // 少し遅延させてから遷移させることで、状態更新が完了してからの遷移を保証
      setTimeout(() => {
        navigate(PATHS.PROTECTED.TOP);
      }, 100);
    },
    onError: (error) => {
      handleError(error, "ログイン");
    },
  });
};
