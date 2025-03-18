import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function simulates checking if the user is authenticated
// In a real application, you would verify a JWT token or session cookie
const isAuthenticated = (request: NextRequest) => {
  // For demo purposes, we'll use a cookie to simulate authentication
  return request.cookies.has("auth_token");
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public and protected paths
  const isPublicPath =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/" ||
    pathname === "/pricing";

  const isProtectedPath = pathname.startsWith("/dashboard");

  // If the user is not authenticated and tries to access a protected route,
  // redirect them to the login page
  if (isProtectedPath && !isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If the user is authenticated and tries to access a public route like sign-in or sign-up,
  // redirect them to the dashboard
  if (isPublicPath && isAuthenticated(request)) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
