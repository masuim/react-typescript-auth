import Cookies from "universal-cookie";

// 一貫した方法でCookieインスタンスを作成
// この関数はシングルトンパターンでインスタンスを保持
let cookiesInstance: Cookies | null = null;
const getCookiesInstance = () => {
  if (!cookiesInstance) {
    if (typeof document === "undefined") {
      cookiesInstance = new Cookies();
    } else {
      cookiesInstance = new Cookies(document.cookie);
    }
  }
  return cookiesInstance;
};

// Cookieの有効期限 (7日)
const EXPIRES = 7;

export const setCookie = (name: string, value: any, options = {}) => {
  const cookies = getCookiesInstance();

  // デフォルトのcookie設定
  // 注意: これらは開発環境向けの設定です
  // 本番環境では、セキュリティを高めるために以下を変更してください:
  // - sameSite: "strict" - クロスサイトリクエストを制限
  // - httpOnly: true - JavaScriptからのアクセスを防止
  // - secure: true - HTTPS経由でのみcookieを送信
  const cookieOptions = {
    path: "/",
    expires: new Date(Date.now() + EXPIRES * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    ...options,
  };

  cookies.set(name, value, cookieOptions);
};

export const getCookie = (name: string) => {
  const cookies = getCookiesInstance();
  const value = cookies.get(name);
  return value;
};

export const removeCookie = (name: string) => {
  const cookies = getCookiesInstance();
  cookies.remove(name, { path: "/" });
};
