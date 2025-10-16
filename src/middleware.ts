import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("accessToken");

  // Redirect logged-in users away from login page to dashboard
  if ((url.pathname === "/login") && token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Protect /generate-review; redirect unauthenticated users to login page
  if (url.pathname.startsWith("/generate-review") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/generate-review/:path*"],
};
