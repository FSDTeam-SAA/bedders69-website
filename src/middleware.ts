import { NextRequest, NextResponse } from "next/server";
import { getDashboardPath, hasRole, normalizeRole } from "@/lib/auth/dashboard";

const routeRoleRequirements: Array<[string, string]> = [
  ["/care-company", "care_company"],
  ["/recruitment-agency", "agency"],
  ["/care", "carer"],
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const rawRole = request.cookies.get("bedders_role")?.value;
  const token = request.cookies.get("bedders_access_token")?.value;
  const role = normalizeRole(rawRole);

  if (pathname === "/dashboard" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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
    if (role && !hasRole(role, requiredRole)) {
      const target = getDashboardPath(role);
      if (target.startsWith("http")) {
        return NextResponse.redirect(target);
      }
      const homeUrl = new URL(target, request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Detail pages require authentication: redirect unauthenticated users to login with descriptive reason
  if (!token) {
    if (pathname.startsWith("/find-care/") && pathname !== "/find-care") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      loginUrl.searchParams.set("reason", "carer_details");
      return NextResponse.redirect(loginUrl);
    }
  }

  // Already logged in user accessing login page
  if (token && role) {
    const destination = getDashboardPath(role);

    if (pathname === "/login") {
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
    "/dashboard",
    "/care",
    "/care/:path*",
    "/care-company",
    "/care-company/:path*",
    "/recruitment-agency",
    "/recruitment-agency/:path*",
    "/find-care/:path*",
  ],
};
