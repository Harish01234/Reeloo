import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User"; // Ensure the correct path
import { connectToDatabase } from "@/lib/db"; // Ensure the correct path

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // Ensure database connection

    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Ensure otpExpiry is a valid Date before comparing
    if (!user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Mark user as verified
    user.verified = true;
    user.otp = null; // Use `null` instead of `undefined`
    user.otpExpiry = null;
    await user.save();

    return NextResponse.json({ message: "Account successfully verified!" }, { status: 200 });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
