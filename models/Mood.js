import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mood: String,
  note: String,
  sentiment: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Mood || mongoose.model("Mood", moodSchema);
