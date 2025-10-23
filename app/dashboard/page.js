"use client";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#34d399", "#f87171", "#60a5fa", "#fbbf24", "#a78bfa"];

export default function DashboardPage() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    async function fetchMoods() {
      try {
        const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods");
        const data = await res.json();
        setMoods(data);
        toast.success("Mood data loaded successfully!");
      } catch (err) {
        toast.error("Failed to load moods 😞");
      } finally {
        setLoading(false);
      }
    }
    fetchMoods();
  }, []);

  const summary = moods.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(summary).map(([mood, count]) => ({ name: mood, value: count }));

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-8" : "bg-gray-100 text-gray-900 min-h-screen p-8"}>
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🌈 VibeLog Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg border hover:bg-gray-700 hover:text-white transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading mood data...</p>
      ) : chartData.length > 0 ? (
        <div className="flex flex-col items-center">
          <PieChart width={400} height={300}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {Object.entries(summary).map(([mood, count]) => (
              <div
                key={mood}
                className="p-4 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-700 transition transform hover:scale-105"
              >
                <p className="text-lg font-semibold">{mood}</p>
                <p className="text-gray-400">{count} times</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No mood data found 😔</p>
      )}
    </div>
  );
}
