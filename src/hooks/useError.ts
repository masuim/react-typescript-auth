import { useState } from "react";

/**
 * エラーハンドリングのためのカスタムフック
 * アプリケーション全体で使用可能な汎用的なエラーハンドリング機能を提供します
 */
export const useError = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = (error: unknown, context?: string) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else if (typeof error === "string") {
      setErrorMessage(error);
    } else {
      setErrorMessage(
        context
          ? `${context}中に予期せぬエラーが発生しました`
          : "予期せぬエラーが発生しました"
      );
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return {
    errorMessage,
    handleError,
    clearError,
  };
};
