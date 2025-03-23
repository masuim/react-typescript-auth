/**
 * 認証フォームの基本インターフェース
 * ログインと登録フォームの共通フィールドを定義
 */
export interface AuthenticationFormBase {
  email: string;
  password: string;
}

/**
 * ログインフォームのデータ型
 */
export interface LoginFormData extends AuthenticationFormBase {}

/**
 * 登録フォームのデータ型
 * パスワード確認フィールドを追加
 */
export interface RegisterFormData extends AuthenticationFormBase {
  confirmPassword: string;
}
