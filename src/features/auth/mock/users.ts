import type { User } from "@/features/auth/types";

// 認証情報を含むモックユーザー（実際のDBではパスワードはハッシュ化して保存する）
interface MockUser extends User {
  password: string; // 実際のアプリではpassword_hashなどにする
}

// モックユーザーデータ
export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "test@example.com",
    name: "テストユーザー",
    password: "password123", // 実際のアプリではハッシュ化する
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "admin@example.com",
    name: "管理者ユーザー",
    password: "admin123", // 実際のアプリではハッシュ化する
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getUsersWithoutPasswords = (): User[] => {
  return mockUsers.map(({ password, ...user }) => user);
};
