import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Vérifier si l'utilisateur est premium pour certaines routes
    if (req.nextUrl.pathname.startsWith("/premium") && !req.nextauth.token?.isPremium) {
      return NextResponse.redirect(new URL("/abonnement", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/profil/:path*",
    "/premium/:path*",
    "/documents/:path*",
  ],
}; 