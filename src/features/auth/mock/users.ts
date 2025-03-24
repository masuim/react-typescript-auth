import type { User } from "src/features/auth/types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    name: "テストユーザー",
    createdAt: "2024-03-20T00:00:00Z",
    updatedAt: "2024-03-20T00:00:00Z",
  },
  {
    id: "2",
    email: "test2@example.com",
    name: "テストユーザー2",
    createdAt: "2024-03-20T00:00:00Z",
    updatedAt: "2024-03-20T00:00:00Z",
  },
];
