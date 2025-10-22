"use client";
import { useState } from "react";

export default function MoodForm({ onMoodAdded }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/moods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, note, rating }),
    });
    setMood("");
    setNote("");
    setRating(3);
    onMoodAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg"
    >
      <h2 className="text-xl mb-4 font-semibold">Add Your Mood</h2>
      <div className="flex flex-col gap-3">
        <input
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Mood (e.g., Happy, Stressed)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <textarea
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          type="number"
          className="p-2 rounded bg-gray-700 text-white"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded font-bold text-white"
        >
          Save Mood
        </button>
      </div>
    </form>
  );
}
