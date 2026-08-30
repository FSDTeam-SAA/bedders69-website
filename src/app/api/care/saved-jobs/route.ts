import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080/api/v1";
async function proxyRequest(path: string, method: string) {
  const token = (await cookies()).get("bedders_access_token")?.value;
  if (!token) return NextResponse.json({ message: "Please log in again" }, { status: 401 });
  const response = await fetch(`${backendUrl}${path}`, { method, headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  return NextResponse.json(await response.json(), { status: response.status });
}
export async function GET() { return proxyRequest("/jobs/get-my-saved-jobs", "GET"); }
export async function POST(request: Request) { const { jobId } = await request.json(); return proxyRequest(`/jobs/save-job/${jobId}`, "POST"); }
export async function DELETE(request: Request) { const { jobId } = await request.json(); return proxyRequest(`/jobs/unsave-job/${jobId}`, "PATCH"); }
