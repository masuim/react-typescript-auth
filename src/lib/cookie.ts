import Cookies from "universal-cookie";
import type { CookieSetOptions } from "universal-cookie";
import { PATHS } from "@/features/auth/constants/paths";

// 時間定数
const ONE_DAY_IN_SECONDS = 60 * 60 * 24; // 60秒 * 60分 * 24時間

/**
 * 与えられたクッキー文字列またはuniversal-cookiesインスタンスからクッキーを取得する
 * @param name クッキー名
 * @param cookieStr クッキー文字列（サーバーサイドのみ）
 * @returns クッキー値
 */
export const getCookie = (
  name: string,
  cookieStr?: string
): string | undefined => {
  if (isServerSide() && cookieStr)
    return extractCookieFromString(name, cookieStr);

  return getClientSideCookie(name);
};

const isServerSide = (): boolean => typeof window === "undefined";

const extractCookieFromString = (
  name: string,
  cookieStr: string
): string | undefined => {
  const regex = new RegExp(`(?:^|;\\s*)${name}=([^;]*)(?:;|$)`);
  const match = regex.exec(cookieStr);

  if (!match) return undefined;

  return decodeURIComponent(match[1]);
};

const getClientSideCookie = (name: string): string | undefined =>
  new Cookies().get(name);

/**
 * クッキーを設定する
 * @param name クッキー名
 * @param value クッキー値
 * @param options クッキーオプション
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieSetOptions = {}
): void => {
  const cookies = new Cookies();

  const defaultOptions: CookieSetOptions = {
    path: PATHS.ROOT,
    maxAge: ONE_DAY_IN_SECONDS, // 1日間
    sameSite: "strict",
    secure: isSecureConnection(),
  };

  cookies.set(name, value, { ...defaultOptions, ...options });
};

const isSecureConnection = (): boolean =>
  typeof window !== "undefined" && window.location.protocol === "https:";

/**
 * クッキーを削除する
 * @param name クッキー名
 * @param options クッキーオプション
 */
export const removeCookie = (
  name: string,
  options: CookieSetOptions = {}
): void => {
  const cookies = new Cookies();
  const defaultOptions: CookieSetOptions = { path: PATHS.ROOT };

  cookies.remove(name, { ...defaultOptions, ...options });
};

