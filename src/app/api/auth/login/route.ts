import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

const dashboardPath: Record<string, string> = {
  admin: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
  supplier: "/marketplace",
  service_provider: "/services",
  care_company: "/care-company/dashboard-overview",
  agency: "/recruitment-agency/overview",
  carer: "/care",
  family: "/",
  user: "/",
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const body = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: body?.message || "Login failed" },
        { status: response.status }
      );
    }

    const data = body?.data ?? body;
    const token =
      data?.accessToken || data?.token || body?.accessToken || body?.token;
    const user = data?.user || body?.user || data;

    if (!token || !user) {
      return NextResponse.json(
        { message: "Login response is incomplete" },
        { status: 502 }
      );
    }

    const reqUrl = request.url || "";
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const isHttps =
      reqUrl.startsWith("https://") ||
      (forwardedProto === "https" && !reqUrl.startsWith("http://"));
    const isSecure = process.env.NODE_ENV === "production" && isHttps;

    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: isSecure,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    cookieStore.set("bedders_access_token", token, cookieOptions);
    cookieStore.set("bedders_role", user.role, cookieOptions);

    const dest = dashboardPath[user.role] || "/";
    const result = NextResponse.json({
      role: user.role,
      dashboardPath: dest,
    });

    result.cookies.set("bedders_access_token", token, cookieOptions);
    result.cookies.set("bedders_role", user.role, cookieOptions);

    return result;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
