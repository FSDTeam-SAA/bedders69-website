import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080/api/v1";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("bedders_access_token")?.value;
  if (!token) return NextResponse.json({ message: "Please sign in to continue" }, { status: 401 });
  const { id } = await params;
  const response = await fetch(`${backendUrl}/payment/create-membership-checkout/${encodeURIComponent(id)}`, {
    method: "POST", headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json().catch(() => ({}));
  return NextResponse.json(body, { status: response.status });
}
