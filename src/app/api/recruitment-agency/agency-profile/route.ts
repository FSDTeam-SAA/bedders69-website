import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function GET() {
  try {
    const token = (await cookies()).get("bedders_access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${backendUrl}/agency/get-my-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const body = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: body?.message || "Failed to fetch agency profile" },
        { status: response.status }
      );
    }

    return NextResponse.json(body?.data ?? body);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const token = (await cookies()).get("bedders_access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const response = await fetch(`${backendUrl}/agency/update-my-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const body = await response.json();
      if (!response.ok) {
        return NextResponse.json(
          { message: body?.message || "Failed to update agency profile" },
          { status: response.status }
        );
      }

      return NextResponse.json(body?.data ?? body);
    } else {
      const payload = await request.json();
      const response = await fetch(`${backendUrl}/agency/update-my-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const body = await response.json();
      if (!response.ok) {
        return NextResponse.json(
          { message: body?.message || "Failed to update agency profile" },
          { status: response.status }
        );
      }

      return NextResponse.json(body?.data ?? body);
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
