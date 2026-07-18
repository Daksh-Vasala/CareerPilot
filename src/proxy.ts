import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isProtected =
    req.nextUrl.pathname.startsWith("/dashboard");

  if (!isLoggedIn && isProtected) {
    return Response.redirect(
      new URL("/login", req.nextUrl)
    );
  }

  if (
    isLoggedIn &&
    req.nextUrl.pathname.startsWith("/login")
  ) {
    return Response.redirect(
      new URL("/dashboard", req.nextUrl)
    );
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};