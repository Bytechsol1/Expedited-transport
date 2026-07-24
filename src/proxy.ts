import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isApiRoute = pathname.startsWith("/api/admin");

  if (!isLoginPage && !request.auth) {
    if (isApiRoute) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && request.auth) {
    return NextResponse.redirect(new URL("/admin/rates", request.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
