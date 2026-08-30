import { NextResponse } from "next/server";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${backendUrl}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    const body = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: body?.message || "Failed to send OTP email" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email successfully",
      data: body?.data || body,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
