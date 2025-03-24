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

export interface AuthenticationFormBase {
  email: string;
  password: string;
}

export interface LoginFormData extends AuthenticationFormBase {}

export interface RegisterFormData extends AuthenticationFormBase {
  confirmPassword: string;
}
