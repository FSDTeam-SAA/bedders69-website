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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("bedders_role")?.value;
  const token = request.cookies.get("bedders_access_token")?.value;
  const requiredRole = routeRoles.find(([prefix]) => pathname.startsWith(prefix))?.[1];
  if (requiredRole && !token) return NextResponse.redirect(new URL("/login", request.url));
  if (requiredRole && role !== requiredRole) return NextResponse.redirect(new URL(roleHome[role || ""] || "/", request.url));
  if (pathname === "/login" && token && role) return NextResponse.redirect(new URL(roleHome[role] || "/", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/login", "/care/:path*", "/care-company/:path*", "/recruitment-agency/:path*"] };
