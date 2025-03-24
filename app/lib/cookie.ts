import Cookies from "universal-cookie";

const cookies = new Cookies();

// Cookieの有効期限 (7日)
const EXPIRES = 7;

export const setCookie = (name: string, value: any, options = {}) => {
  cookies.set(name, value, {
    path: "/",
    expires: new Date(Date.now() + EXPIRES * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    ...options,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name, { path: "/" });
};
