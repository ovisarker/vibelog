"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Smile, Frown, Meh, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from MockAPI
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods");

        if (!res.ok) {
          toast.error(`API Error: ${res.status}`);
          console.warn("API returned non-200:", res.status);
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
      } catch (err) {
        console.error("Fetch failed:", err);
        toast.error("Failed to load mood data");
        setMoods([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mood summary
  const moodSummary = moods.length
    ? moods.reduce(
        (acc, mood) => {
          acc[mood.type] = (acc[mood.type] || 0) + 1;
          return acc;
        },
        {}
      )
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div
        className="max-w-5xl mx-auto py-12 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="text-indigo-500" /> Mood Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">
            Track your mood history and analytics
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
          </div>
        ) : moods.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No mood entries found 😔
            </p>
            <p className="text-sm text-gray-400">Try adding new moods!</p>
          </motion.div>
        ) : (
          <>
            {/* Summary Cards */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {Object.entries(moodSummary).map(([type, count]) => (
                <motion.div
                  key={type}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center mb-2">
                    {type === "happy" && <Smile className="text-yellow-500" />}
                    {type === "sad" && <Frown className="text-blue-400" />}
                    {type === "neutral" && <Meh className="text-gray-500" />}
                  </div>
                  <h3 className="text-center capitalize font-semibold">{type}</h3>
                  <p className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {count}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Moods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Recent Mood Entries
                </h2>
              </div>
              <ul>
                {moods.slice(-5).reverse().map((mood) => (
                  <li
                    key={mood.id}
                    className="p-4 flex justify-between border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                  >
                    <span className="capitalize">{mood.type}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(mood.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
