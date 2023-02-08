import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  //const token = req.headers.get("token"); // get token from request header

  const token: any = req.cookies.get("user")?.value;
  console.log("currentUser login ===>", token);

  const verifedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verifedToken) {
    return;
  }

  if (req.url.includes("/login") && verifedToken) {
    const signinUrl = new URL("/", req.url);
    return NextResponse.redirect(signinUrl);
  }

  if (!verifedToken) {
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
