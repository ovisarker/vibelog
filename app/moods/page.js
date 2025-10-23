"use client";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function MoodsPage() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setMoods(data);
        toast.success("Moods loaded successfully!");
      } catch (error) {
        console.error("Error fetching moods:", error);
        toast.error("Failed to load moods");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6">🌈 All Moods</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : moods.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
            >
              <h2 className="font-semibold text-xl">{mood.name || "Unknown"}</h2>
              <p className="text-gray-400 mt-2">Mood: {mood.mood || "N/A"}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(mood.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No mood entries yet 😔</p>
      )}
    </main>
  );
}
