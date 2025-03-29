import type { User } from "@/features/auth/types";
import { getUsersWithoutPasswords } from "@/features/users/mock/mockUsers";

/**
 * すべてのユーザーを取得する関数
 *
 * 注意: これはモック実装です
 * 実際の環境では、APIやデータベースからユーザーリストを取得します
 */
export const getUsers = async (): Promise<User[]> => {
  // 遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 300));

  // パスワードを除外したユーザーリストを返す
  return getUsersWithoutPasswords();
};

