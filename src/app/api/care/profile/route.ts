import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

async function proxyProfileRequest(
  method: "GET" | "PATCH",
  body?: BodyInit,
  isMultipart = false,
) {
  const token = (await cookies()).get("bedders_access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Please log in again" }, { status: 401 });
  }

  const response = await fetch(`${backendUrl}/care/${method === "GET" ? "get-my-profile" : "update-my-profile"}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(method === "PATCH" && !isMultipart
        ? { "Content-Type": "application/json" }
        : {}),
    },
    ...(method === "PATCH" ? { body } : {}),
    cache: "no-store",
  });

  const responseBody = await response.json().catch(() => ({ message: "Unexpected server response" }));
  return NextResponse.json(responseBody, { status: response.status });
}

export async function GET() {
  return proxyProfileRequest("GET");
}

export async function PATCH(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const body = contentType.includes("multipart/form-data")
    ? await request.formData()
    : JSON.stringify(await request.json());

  return proxyProfileRequest("PATCH", body, contentType.includes("multipart/form-data"));
}
