"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function MoodChart({ moods }) {
  if (!moods.length) return <p>No moods yet. Add your first mood above!</p>;

  const data = {
    labels: moods.map((m) =>
      new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        label: "Mood Trend",
        data: moods.map((m) => m.sentiment || 0),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Line data={data} />
    </div>
  );
}
