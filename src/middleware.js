import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware Executed");
  const authToken = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define paths where logged-in users should not access
  const loggedInUserAccessPaths = ["/", "/auth/login", "/auth/signup"];

  // If the user is on login/signup and already logged in, redirect to /dashboard
  if (loggedInUserAccessPaths.includes(pathname) && authToken) {
    console.log("Redirecting logged-in user to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is trying to access protected routes without a token, redirect to /auth/login
  const protectedPaths = ["/dashboard", "/auth/blog"];
  const isProtectedRoute = protectedPaths.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !authToken) {
    console.log("Redirecting unauthorized user to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow the request to proceed normally if no redirects are needed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*", "/auth/blog/:path*"],
};
