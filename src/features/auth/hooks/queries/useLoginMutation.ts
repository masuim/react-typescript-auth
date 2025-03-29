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
    onSuccess: async (user) => {
      setUser(user);
      setIsAuthenticated(true);

      await Promise.resolve();
      navigate(PATHS.PROTECTED.TOP);
    },
    onError: (error) => {
      handleError(error, "ログイン");
    },
  });
};
