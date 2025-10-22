import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      status: "success",
      message: "✅ MongoDB connection established successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "❌ MongoDB connection failed",
      details: error.message,
    });
  }
}
