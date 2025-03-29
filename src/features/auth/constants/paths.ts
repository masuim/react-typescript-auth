export const PATHS = {
  ROOT: "/",
  AUTH: {
    LOGIN: "/login",
    // 今後追加される可能性のある認証関連のパス
    // REGISTER: "/register",
    // FORGOT_PASSWORD: "/forgot-password",
    // RESET_PASSWORD: "/reset-password",
  },
  PROTECTED: {
    TOP: "/top",
    // 今後追加される可能性のある保護されたページのパス
    // PROFILE: "/profile",
    // SETTINGS: "/settings",
  },
} as const;

