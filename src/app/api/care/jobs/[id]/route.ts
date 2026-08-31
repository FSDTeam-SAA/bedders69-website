import { NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const response = await fetch(
    `${backendUrl}/jobs/get-job/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  return NextResponse.json(await response.json(), { status: response.status });
}
