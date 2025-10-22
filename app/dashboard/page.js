"use client";
import { useEffect, useState } from "react";
import MoodForm from "../../components/MoodForm";
import MoodChart from "../../components/MoodChart";

export default function Dashboard() {
  const [moods, setMoods] = useState([]);
  const [summary, setSummary] = useState("");

  async function loadMoods() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/moods", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setMoods(data.moods);

    const sres = await fetch("/api/moods/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const sdata = await sres.json();
    if (sdata.success) setSummary(sdata.summary);
  }

  useEffect(() => {
    loadMoods();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="text-gray-500 mb-6">{summary}</p>
      <MoodForm onSubmit={loadMoods} />
      <MoodChart moods={moods} />
    </div>
  );
}
