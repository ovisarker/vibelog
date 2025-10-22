import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Mood from "../../../../models/Mood";
import { dbConnect } from "../../../../lib/dbConnect";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();

    const moods = await Mood.find({ userId: decoded.id }).sort({ createdAt: -1 });
    if (!moods.length)
      return NextResponse.json({ summary: "No moods logged yet." });

    const avgSentiment =
      moods.reduce((sum, m) => sum + (m.sentiment || 0), 0) / moods.length;

    let summary = "Your mood this week seems balanced.";
    if (avgSentiment > 0.3) summary = "You seem happier this week 😊";
    else if (avgSentiment < -0.3) summary = "You’ve felt a bit low lately 😔";

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
