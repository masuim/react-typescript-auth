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
    console.log(
      `サーバーサイドでクッキー「${name}」を検索中、cookieStr:`,
      cookieStr
    );

    // より厳密な正規表現パターンを使用
    const regex = new RegExp(`(?:^|;\\s*)${name}=([^;]*)(?:;|$)`);
    const match = regex.exec(cookieStr);

    if (match) {
      console.log(
        `サーバーサイドでクッキー「${name}」の値を見つけました:`,
        match[1]
      );
      return decodeURIComponent(match[1]);
    }

    console.log(`サーバーサイドでクッキー「${name}」が見つかりませんでした`);
    return undefined;
  } else {
    // クライアントサイド: universal-cookiesを使用
    const cookies = new Cookies();
    const value = cookies.get(name);
    console.log(`クライアントサイドでクッキー「${name}」の値:`, value);
    return value;
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

  // デバッグ用
  console.log(`クッキーが設定されました: ${name}=${value}`);
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

  // デバッグ用
  console.log(`クッキーが削除されました: ${name}`);
}
