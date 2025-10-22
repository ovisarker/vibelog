import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Mood from "../models/Mood.js";

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI, { dbName: "vibelog" });

await User.deleteMany({});
await Mood.deleteMany({});

const user = await User.create({
  name: "Demo User",
  email: "demo@vibelog.com",
  password: "demo123",
});

await Mood.create([
  { user: user._id, mood: "😊", note: "Had a good day coding!" },
  { user: user._id, mood: "😐", note: "A bit tired but okay." },
  { user: user._id, mood: "😔", note: "Feeling low today." },
]);

console.log("🌱 Demo data inserted successfully!");
mongoose.disconnect();
