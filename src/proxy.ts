import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const role = (request.auth?.user as { role?: string } | undefined)?.role;

  const isAdminSection = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (isAdminSection) {
    const isAdmin = role === "admin";

    if (!isAdminLoginPage && !isAdmin) {
      if (isAdminApiRoute) {
        return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminLoginPage && isAdmin) {
      return NextResponse.redirect(new URL("/admin/portal", request.nextUrl.origin));
    }

    return NextResponse.next();
  }

  const isAccountSection = pathname.startsWith("/account") || pathname.startsWith("/api/account");
  const isAccountApiRoute = pathname.startsWith("/api/account");

  if (isAccountSection) {
    const isCustomer = role === "customer";

    if (!isCustomer) {
      if (isAccountApiRoute) {
        return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
      }
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login" && role === "customer") {
    return NextResponse.redirect(new URL("/account", request.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/account/:path*", "/api/account/:path*", "/login"],
};
