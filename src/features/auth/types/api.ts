/**
 * 認証関連のエラー情報を表すインターフェース
 */
export interface AuthError {
  message: string;
  code?: string;
}
