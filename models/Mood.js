import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Mood from "@/models/Mood";

export async function GET() {
  await dbConnect();
  const moods = await Mood.find().sort({ createdAt: -1 });
  return NextResponse.json(moods);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const newMood = await Mood.create(body);
  return NextResponse.json(newMood, { status: 201 });
}
