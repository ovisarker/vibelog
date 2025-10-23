"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smile, Frown, Meh, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MoodsPage() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMood, setNewMood] = useState("");

  // Fetch all moods
  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods");

        if (!res.ok) {
          toast.error(`API Error: ${res.status}`);
          setMoods([]);
          return;
        }

        const json = await res.json();
        if (Array.isArray(json)) {
          setMoods(json);
        } else {
          toast.error("Invalid data format");
          setMoods([]);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        toast.error("Failed to load moods");
        setMoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  // Add new mood
  const addMood = async () => {
    if (!newMood.trim()) {
      toast.error("Please select a mood");
      return;
    }

    try {
      const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newMood,
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setMoods((prev) => [...prev, newEntry]);
        toast.success("Mood added successfully!");
        setNewMood("");
      } else {
        toast.error(`Failed to add mood (Error ${res.status})`);
      }
    } catch (error) {
      toast.error("Network error while adding mood");
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div
        className="max-w-4xl mx-auto py-12 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Smile className="text-indigo-500" /> Mood Tracker
          </h1>
          <div className="flex gap-2 items-center">
            <select
              value={newMood}
              onChange={(e) => setNewMood(e.target.value)}
              className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 bg-white text-sm focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select mood</option>
              <option value="happy">😊 Happy</option>
              <option value="sad">😢 Sad</option>
              <option value="neutral">😐 Neutral</option>
            </select>
            <button
              onClick={addMood}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
          </div>
        ) : moods.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No moods recorded yet 😔
            </p>
            <p className="text-sm text-gray-400">Add one above to get started.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {moods
              .slice()
              .reverse()
              .map((mood) => (
                <motion.div
                  key={mood.id}
                  variants={fadeUp}
                  className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    {mood.type === "happy" && <Smile className="text-yellow-500 w-8 h-8" />}
                    {mood.type === "sad" && <Frown className="text-blue-400 w-8 h-8" />}
                    {mood.type === "neutral" && <Meh className="text-gray-500 w-8 h-8" />}

                    <h3 className="capitalize font-semibold">{mood.type}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(mood.createdAt).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
