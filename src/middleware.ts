import { NextRequest, NextResponse } from "next/server";

const roleHome: Record<string, string> = {
  care_company: "/care-company/dashboard-overview",
  agency: "/recruitment-agency/overview",
  carer: "/care",
  admin: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
  supplier: "/marketplace",
  service_provider: "/services",
  family: "/",
  user: "/",
};

const routeRoleRequirements: Array<[string, string]> = [
  ["/care-company", "care_company"],
  ["/recruitment-agency", "agency"],
  ["/care", "carer"],
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const role = request.cookies.get("bedders_role")?.value;
  const token = request.cookies.get("bedders_access_token")?.value;

  // Check if pathname falls under any role-protected prefix
  const routeReq = routeRoleRequirements.find(([prefix]) => pathname.startsWith(prefix));

  if (routeReq) {
    const [, requiredRole] = routeReq;
    // Unauthenticated user accessing protected route -> redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated user with invalid/unauthorized role -> redirect to their role dashboard
    if (role && role !== requiredRole) {
      const target = roleHome[role] || "/";
      if (target.startsWith("http")) {
        return NextResponse.redirect(target);
      }
      const homeUrl = new URL(target, request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Already logged in user accessing login page or home page:
  // Dashboard roles -> redirect straight to dashboard
  // Family/user role -> stay on website home
  if (token && role) {
    const destination = roleHome[role] || "/";

    if (pathname === "/login") {
      if (destination.startsWith("http")) {
        return NextResponse.redirect(destination);
      }
      return NextResponse.redirect(new URL(destination, request.url));
    }

    if (pathname === "/" && destination !== "/") {
      if (destination.startsWith("http")) {
        return NextResponse.redirect(destination);
      }
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/care/:path*",
    "/care-company/:path*",
    "/recruitment-agency/:path*",
  ],
};
