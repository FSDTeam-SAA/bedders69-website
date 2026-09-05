import { NextRequest, NextResponse } from "next/server";

const roleHome: Record<string, string> = {
  care_company: "/care-company/dashboard-overview",
  agency: "/recruitment-agency/overview",
  carer: "/care",
  admin: "http://localhost:3001",
  supplier: "/marketplace",
  service_provider: "/services",
  family: "/",
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
      const homeUrl = new URL(roleHome[role] || "/", request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Already logged in user accessing login page -> redirect to their role home
  if (pathname === "/login" && token && role) {
    const destination = roleHome[role] || "/";
    if (destination.startsWith("http")) {
      return NextResponse.redirect(destination);
    }
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/care/:path*",
    "/care-company/:path*",
    "/recruitment-agency/:path*",
  ],
};
