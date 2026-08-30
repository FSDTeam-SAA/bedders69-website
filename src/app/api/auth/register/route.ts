import { NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

const ROLE_MAP: Record<string, string> = {
  user: "family",
  family: "family",
  care_company: "care_company",
  agency: "agency",
  recruitment_agency: "agency",
  carer: "carer",
  supplier: "supplier",
  product_supplier: "supplier",
  service_provider: "service_provider",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedRole = ROLE_MAP[role] || "family";

    const payload = {
      fullName: fullName || email.split("@")[0] || "User",
      email: email.trim().toLowerCase(),
      password,
      role: normalizedRole,
    };

    const response = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: resData?.message || "Registration failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: resData?.data || resData,
      role: normalizedRole,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to connect to backend server" },
      { status: 500 }
    );
  }
}
