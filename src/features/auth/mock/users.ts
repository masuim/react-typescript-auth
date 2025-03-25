import type { User } from "@/features/auth/types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    name: "テストユーザー",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "admin@example.com",
    name: "管理者ユーザー",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// テスト用固定パスワード（実際の実装では使用しません）
export const MOCK_PASSWORD = "password123";
