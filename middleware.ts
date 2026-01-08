// import { auth as middleware } from "@/auth";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);
export default middleware((req) => {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/auth/signin") ||
    pathname.startsWith("/auth/signup") ||
    pathname.startsWith("/api/auth")
  ) {
    return;
  }

  if (!req.auth && pathname.startsWith("/home")) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("redirectTo", pathname);
    return Response.redirect(url);
  }
});
