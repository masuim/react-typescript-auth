/**
 * 認証エラーのハンドリング
 *
 * 認証関連のエラーを適切な形式に変換するユーティリティ関数
 * 主にログインやログアウト時のエラーハンドリングで使用
 */
export const handleAuthError = (error: unknown): { message: string } => {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: "予期せぬエラーが発生しました" };
};
