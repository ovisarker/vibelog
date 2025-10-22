"use client";
import { useEffect, useState } from "react";
import MoodForm from "@/components/MoodForm";
import MoodChart from "@/components/MoodChart";

export default function MoodsPage() {
  const [moods, setMoods] = useState([]);

  // Load moods from API
  const loadMoods = async () => {
    const res = await fetch("/api/moods");
    const data = await res.json();
    setMoods(data);
  };

  useEffect(() => {
    loadMoods();
  }, []);

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Mood Tracker</h1>

      <MoodForm onMoodAdded={loadMoods} />
      <MoodChart moods={moods} />
    </div>
  );
}
