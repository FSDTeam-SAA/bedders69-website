import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080/api/v1";

export async function GET(request: Request) {
  const token = (await cookies()).get("bedders_access_token")?.value;
  if (!token) return NextResponse.json({ message: "Please log in again" }, { status: 401 });
  const query = new URL(request.url).searchParams.toString();
  const response = await fetch(`${backendUrl}/job-applications/get-my-applications${query ? `?${query}` : ""}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  return NextResponse.json(await response.json(), { status: response.status });
}
