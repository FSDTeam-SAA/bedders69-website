import { NextRequest, NextResponse } from "next/server";

function resolveDashboardPath(role?: string | null): string {
  if (!role) return "/";
  const r = role.toLowerCase().trim().replace(/-/g, "_");
  switch (r) {
    case "care_company":
      return "/care-company/dashboard-overview";
    case "agency":
    case "recruitment_agency":
      return "/recruitment-agency/overview";
    case "carer":
      return "/care";
    case "supplier":
      return "/marketplace";
    case "service_provider":
      return "/services";
    case "admin":
      return process.env.NEXT_PUBLIC_ADMIN_URL || "/";
    default:
      return "/";
  }
}

function normalizeRole(role?: string | null): string {
  if (!role) return "";
  return role.toLowerCase().trim().replace(/-/g, "_");
}

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
    if (role && role !== requiredRole && !(requiredRole === "agency" && role === "recruitment_agency")) {
      const target = resolveDashboardPath(role);
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
    const destination = resolveDashboardPath(role);

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
    "/care",
    "/care/:path*",
    "/care-company",
    "/care-company/:path*",
    "/recruitment-agency",
    "/recruitment-agency/:path*",
    "/find-care/:path*",
  ],
};

