/**
 * 実際の運用に合わせて変更が必要
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

import type {
  LoginFormValues,
  RegisterFormValues,
} from "../schemas/authSchemas";

export type FormData = LoginFormValues & Partial<RegisterFormValues>;
