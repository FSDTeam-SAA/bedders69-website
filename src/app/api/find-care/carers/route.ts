import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("bedders_access_token")?.value;

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = `${backendUrl}/profiles/search-carers${
      queryString ? `?${queryString}` : ""
    }`;

    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(targetUrl, {
      headers,
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || "Failed to fetch carers",
          data: [],
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}
