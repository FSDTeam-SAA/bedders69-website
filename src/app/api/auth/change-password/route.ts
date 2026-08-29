import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080/api/v1";

export async function POST(request: Request) {
  const token = (await cookies()).get("bedders_access_token")?.value;
  if (!token) return NextResponse.json({ message: "Please log in again" }, { status: 401 });
  const { oldPassword, newPassword } = await request.json();
  const response = await fetch(`${backendUrl}/auth/change-password`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ oldPassword, newPassword }) });
  const body = await response.json();
  return NextResponse.json(body, { status: response.status });
}
