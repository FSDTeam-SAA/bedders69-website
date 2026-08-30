import { NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP code are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${backendUrl}/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otp.trim() }),
    });

    const body = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: body?.message || "Invalid or expired OTP" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      data: body?.data || body,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
