"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MoodForm({ onSubmit }) {
  const [form, setForm] = useState({ mood: "😊", note: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("/api/moods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Mood added!");
      setForm({ mood: "😊", note: "" });
      onSubmit();
    } else toast.error(data.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6"
    >
      <div className="flex gap-2 items-center">
        <select
          className="p-2 rounded bg-gray-100 dark:bg-gray-700"
          value={form.mood}
          onChange={(e) => setForm({ ...form, mood: e.target.value })}
        >
          <option>😊</option>
          <option>😐</option>
          <option>😔</option>
          <option>😡</option>
          <option>😴</option>
        </select>
        <input
          type="text"
          placeholder="Add a note..."
          className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          +
        </button>
      </div>
    </form>
  );
}
