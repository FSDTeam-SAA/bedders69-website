import { NextRequest, NextResponse } from "next/server";

const roleHome: Record<string, string> = {
  care_company: "/care-company",
  agency: "/recruitment-agency",
  carer: "/care",
};

const routeRoles: Array<[string, string]> = [
  ["/care-company", "care_company"],
  ["/recruitment-agency", "agency"],
  ["/care", "carer"],
];

const publicRoutes = new Set([
  "/care-company/dashboard-overview",
  "/care-company/company-profile",
  "/care-company/company-profile/edit",
  "/care-company/edit-profile",
  "/care-company/save-carers",
  "/care-company/create-job",
  "/care-company/applicants",
  "/care-company/contact-requests",
  "/care-company/membership",
  "/care-company/settings",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    publicRoutes.has(pathname) ||
    pathname.startsWith("/care-company/save-carers/")
  ) {
    return NextResponse.next();
  }

  const role = request.cookies.get("bedders_role")?.value;
  const token = request.cookies.get("bedders_access_token")?.value;
  const requiredRole = routeRoles.find(([prefix]) => pathname.startsWith(prefix))?.[1];
  if (requiredRole && !token) return NextResponse.redirect(new URL("/login", request.url));
  if (requiredRole && role !== requiredRole) return NextResponse.redirect(new URL(roleHome[role || ""] || "/", request.url));
  if (pathname === "/login" && token && role) return NextResponse.redirect(new URL(roleHome[role] || "/", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/login", "/care/:path*", "/care-company/:path*", "/recruitment-agency/:path*"] };
