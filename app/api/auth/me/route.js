import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await dbConnect();
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  return NextResponse.json({ user });
}

export async function PUT(request) {
  await dbConnect();
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const body = await request.json();

  const updated = await User.findByIdAndUpdate(
    decoded.id,
    { theme: body.theme, budget: body.budget },
    { new: true }
  ).select("-password");

  return NextResponse.json({ user: updated });
}
