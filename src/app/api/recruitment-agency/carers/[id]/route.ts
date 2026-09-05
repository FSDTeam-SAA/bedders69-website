import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("bedders_access_token")?.value;

    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Attempt 1: get saved carer by ID
    let response = await fetch(`${backendUrl}/company/get-saved-carers/${id}`, {
      headers,
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Attempt 2: fallback to search-carers endpoint
    const searchRes = await fetch(`${backendUrl}/profiles/search-carers?limit=50&page=1`, {
      headers,
      cache: "no-store",
    });

    if (searchRes.ok) {
      const sData = await searchRes.json();
      const list = sData.data || [];
      const matched = list.find((c: any) => c._id === id || c.id === id || c.carerId === id);
      if (matched) {
        return NextResponse.json({ data: matched });
      }
    }

    return NextResponse.json(
      { message: "Carer details not found" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("bedders_access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const response = await fetch(`${backendUrl}/company/remove-saved-carer/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to remove carer" },
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
