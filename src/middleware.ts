import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  const isAuthPage = request.nextUrl.pathname === "/";
  const isProtectedPage = ["/home", "/transactions", "/about"].some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!authToken && isProtectedPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// Define quais rotas usarão o middleware
export const config = {
  matcher: ["/", "/home", "/transactions/:path*", "/about"],
};