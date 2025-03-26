import { useState, useCallback } from "react";

/**
 * エラーハンドリングのためのカスタムフック
 * 既存のErrorMessageコンポーネントと組み合わせて使用します
 */
export const useError = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else if (typeof error === "string") {
      setErrorMessage(error);
    } else {
      setErrorMessage("予期せぬエラーが発生しました。");
    }
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    errorMessage,
    handleError,
    clearError,
  };
};
