export * from "./domain";
export * from "./api";

import type {
  LoginFormValues,
  RegisterFormValues,
} from "../schemas/authSchemas";

export type FormData = LoginFormValues & Partial<RegisterFormValues>;
