import { SignJWT } from "jose";
import {
  createContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import Layout from "../Layout";
import { NextResponse } from "next/server";
import cookie from "cookie";

export const AuthContext = createContext<any | undefined>(undefined);

const COOKIE_NAME = "user";
function getCookie() {
  const regex = new RegExp(
    `(?:(?:^|.*;\\s*)${COOKIE_NAME}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  if (process.browser) {
    const cookie = document?.cookie?.replace(regex, "$1");
    return cookie.length ? JSON.parse(cookie) : undefined;
  }
}

let initialCookieValue = getCookie() || null;

export const AuthContextProvider = ({ children }: any) => {
  // const item: any =
  //   typeof window !== "undefined"
  //     ? JSON.parse(localStorage.getItem("user") || "false")
  //     : null;
  const [currentUser, setCurrentUser] = useState(initialCookieValue || null);

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     setCurrentUser(JSON.parse(localStorage.getItem("user")));
  //   }
  // }, []);

  async function login(res: any) {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    res.setHeader(
      cookie.serialize("user-token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );
  }

  console.log("currentuser =>=>=>=>=>", currentUser);

  // const login = () => {

  //   setCurrentUser({ id: 1, name: "john", pic: "" });
  // };

  // useEffect(() => {
  //   document.cookie = `${COOKIE_NAME}=${JSON.stringify(currentUser)}`;
  // }, [currentUser]);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
