import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function POST() {
  const token = (await cookies()).get("bedders_access_token")?.value;

  // The backend logout only clears its refresh-token cookie. The app's
  // authentication cookies are cleared below regardless of backend availability.
  await fetch(`${backendUrl}/auth/logout`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }).catch(() => undefined);

  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("bedders_access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  response.cookies.set("bedders_role", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
