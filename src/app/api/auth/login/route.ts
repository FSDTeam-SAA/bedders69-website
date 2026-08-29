import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080/api/v1";
const dashboardPath: Record<string, string> = {
  admin: "http://localhost:3000/admin",
  supplier: "http://localhost:3000/supplier",
  service_provider: "http://localhost:3000/service",
  care_company: "/care-company",
  agency: "/recruitment-agency",
  carer: "/care",
  family: "/",
};

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  const response = await fetch(`${backendUrl}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  const body = await response.json();
  if (!response.ok) return NextResponse.json({ message: body?.message || "Login failed" }, { status: response.status });
  const data = body?.data ?? body;
  const token = data?.accessToken || data?.token || body?.accessToken || body?.token;
  const user = data?.user || body?.user || data;
  if (!token || !user) return NextResponse.json({ message: "Login response is incomplete" }, { status: 502 });
  const result = NextResponse.json({ role: user.role, dashboardPath: dashboardPath[user.role] || "/" });
  result.cookies.set("bedders_access_token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  result.cookies.set("bedders_role", user.role, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return result;
}
