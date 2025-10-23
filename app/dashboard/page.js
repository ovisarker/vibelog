"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smile, Calendar, Activity, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SettingsSummary from "@/components/SettingsSummary";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data (or from MockAPI)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/users/1");
        if (!res.ok) {
          toast.error("Failed to fetch user info");
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        toast.error("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div
        className="max-w-6xl mx-auto py-12 px-6 space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Smile className="text-indigo-500" /> Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name || "Guest"} 👋
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleString("en-US", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
              variants={fadeUp}
            >
              <motion.div
                variants={fadeUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition-all"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">Mood Entries</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {user?.moodCount || 12}
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition-all"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Streak</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {user?.streak || 5} days
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition-all"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "Today"}
                </p>
              </motion.div>
            </motion.div>

            {/* Settings Summary */}
            <motion.div variants={fadeUp}>
              <SettingsSummary />
            </motion.div>

            {/* Mood Tracker Summary */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition-all"
              variants={fadeUp}
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Activity className="text-indigo-500" /> Mood Activity
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You’ve logged <strong>{user?.moodCount || 12}</strong> moods so far this
                week. Keep up the habit for better self-awareness 🌿
              </p>
            </motion.div>

            {/* Calendar Overview */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition-all"
              variants={fadeUp}
            >
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Calendar className="text-indigo-500" /> Weekly Overview
              </h2>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div
                    key={i}
                    className={`text-center py-2 rounded-lg ${
                      i < 5
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
