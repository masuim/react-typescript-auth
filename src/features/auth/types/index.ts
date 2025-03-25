// 仮の認証ユーザータイプ - APIの仕様に合わせて拡張すること
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data?: User;
  error?: string;
}

// フォーム関連の型
import type {
  LoginFormValues,
  RegisterFormValues,
} from "../schemas/authSchemas";

export type FormData = LoginFormValues & Partial<RegisterFormValues>;
