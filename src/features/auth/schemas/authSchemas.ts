import { z } from "zod";
import { AUTH_VALIDATION_MESSAGES } from "@/features/auth/constants/validation-messages";

const baseAuthSchema = {
  email: z
    .string()
    .min(1, AUTH_VALIDATION_MESSAGES.email.required)
    .email(AUTH_VALIDATION_MESSAGES.email.invalid),
  password: z
    .string()
    .min(1, AUTH_VALIDATION_MESSAGES.password.required)
    .min(8, AUTH_VALIDATION_MESSAGES.password.minLength),
};

export const loginSchema = z.object({
  ...baseAuthSchema,
});

export const registerSchema = z
  .object({
    ...baseAuthSchema,
    confirmPassword: z
      .string()
      .min(1, AUTH_VALIDATION_MESSAGES.confirmPassword.required),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_VALIDATION_MESSAGES.confirmPassword.match,
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;

