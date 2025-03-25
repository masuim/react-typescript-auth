import Cookies from "universal-cookie";
import type { CookieSetOptions } from "universal-cookie";

/**
 * 与えられたクッキー文字列またはuniversal-cookiesインスタンスからクッキーを取得する
 * @param name クッキー名
 * @param cookieStr クッキー文字列（サーバーサイドのみ）
 * @returns クッキー値
 */
export function getCookie(
  name: string,
  cookieStr?: string
): string | undefined {
  // サーバーサイド: クッキー文字列から値を抽出
  if (typeof window === "undefined" && cookieStr) {
    // より厳密な正規表現パターンを使用
    const regex = new RegExp(`(?:^|;\\s*)${name}=([^;]*)(?:;|$)`);
    const match = regex.exec(cookieStr);

    if (match) {
      return decodeURIComponent(match[1]);
    }
    return undefined;
  } else {
    // クライアントサイド: universal-cookiesを使用
    const cookies = new Cookies();
    return cookies.get(name);
  }
}

/**
 * クッキーを設定する
 * @param name クッキー名
 * @param value クッキー値
 * @param options クッキーオプション
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieSetOptions = {}
): void {
  const cookies = new Cookies();
  const defaultOptions: CookieSetOptions = {
    path: "/",
    maxAge: 86400, // 1日間
    sameSite: "strict",
    secure:
      typeof window !== "undefined" && window.location.protocol === "https:",
  };

  cookies.set(name, value, { ...defaultOptions, ...options });
}

/**
 * クッキーを削除する
 * @param name クッキー名
 * @param options クッキーオプション
 */
export function removeCookie(
  name: string,
  options: CookieSetOptions = {}
): void {
  const cookies = new Cookies();
  const defaultOptions: CookieSetOptions = { path: "/" };

  cookies.remove(name, { ...defaultOptions, ...options });
}
