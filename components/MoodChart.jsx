"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function MoodChart({ moods }) {
  if (!moods || moods.length === 0)
    return <p className="text-gray-400">No mood data yet. Add some!</p>;

  const data = moods.map((m) => ({
    date: new Date(m.createdAt).toLocaleDateString(),
    rating: m.rating,
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Mood Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis domain={[1, 5]} stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
