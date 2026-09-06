import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDashboardPath } from "../login/route";

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
    dashboardPath: getDashboardPath(role),
  });
}
