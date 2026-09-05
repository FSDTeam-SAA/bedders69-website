import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const roleHome: Record<string, string> = {
  care_company: "/care-company/dashboard-overview",
  agency: "/recruitment-agency/overview",
  carer: "/care",
  admin: "http://localhost:3001",
  supplier: "/marketplace",
  service_provider: "/services",
  family: "/",
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bedders_access_token")?.value;
  const role = cookieStore.get("bedders_role")?.value;

  if (!token || !role) {
    return NextResponse.json({ authenticated: false, role: null, dashboardPath: "/" });
  }

  return NextResponse.json({
    authenticated: true,
    role,
    dashboardPath: roleHome[role] || "/",
  });
}
