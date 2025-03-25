import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { login } from "@/features/auth/services/auth";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
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
  });
};
