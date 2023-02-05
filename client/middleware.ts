import { NextRequest, NextResponse } from "next/server";
import { useContext } from "react";
import { AuthContext } from "./components/context/authContext";

export async function middleware(req: NextRequest) {
  const token = req.headers.get("token"); // get token from request header
  const { currentUser } = useContext(AuthContext); // TODO: check if user is authenticated

  if (!currentUser) {
    const signinUrl = new URL("/login", req.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
export const config = {
  matcher: ["/", "/home", "/profile"],
};
