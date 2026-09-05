import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (!searchParams.has("limit")) {
      searchParams.set("limit", "50");
    }
    if (!searchParams.has("page")) {
      searchParams.set("page", "1");
    }

    const queryString = searchParams.toString();
    const targetUrl = `${backendUrl}/profiles/search-carers?${queryString}`;

    const cookieStore = await cookies();
    const token = cookieStore.get("bedders_access_token")?.value;

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
        { message: data?.message || "Failed to fetch carers" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("bedders_access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${backendUrl}/company/save-carer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to save carer" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
