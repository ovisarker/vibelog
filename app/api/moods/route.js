import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Mood from "../../../models/Mood";
import { dbConnect } from "../../../lib/dbConnect";
import { analyzeMood } from "../../../utils/sentiment";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { mood, note } = await req.json();

    await dbConnect();
    const sentiment = analyzeMood(note || "");
    const newMood = await Mood.create({
      userId: decoded.id,
      mood,
      note,
      sentiment,
    });

    return NextResponse.json({ success: true, mood: newMood });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();
    const moods = await Mood.find({ userId: decoded.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, moods });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
