"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Bell, Settings, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user preferences from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const storedNotif = localStorage.getItem("notifications") === "true";
    setTheme(storedTheme);
    setNotifications(storedNotif);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Save preferences
  const saveSettings = async () => {
    setSaving(true);
    try {
      localStorage.setItem("theme", theme);
      localStorage.setItem("notifications", notifications);
      document.documentElement.classList.toggle("dark", theme === "dark");
      toast.success("Settings saved successfully!");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <motion.div
        className="max-w-3xl mx-auto py-12 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="flex items-center gap-2 mb-8">
          <Settings className="text-indigo-500" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Theme Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6"
          variants={fadeUp}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sun className="text-yellow-400 dark:hidden" />
                <Moon className="text-indigo-400 hidden dark:inline" />
                Theme
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred appearance.
              </p>
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`relative w-16 h-8 flex items-center rounded-full p-1 transition ${
                theme === "dark" ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <motion.div
                layout
                className="w-6 h-6 bg-white rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Notification Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6"
          variants={fadeUp}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="text-indigo-500" /> Notifications
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable or disable push notifications.
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-16 h-8 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <motion.div
                layout
                className="w-6 h-6 bg-white rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div className="text-center mt-8" variants={fadeUp}>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 disabled:opacity-60 flex items-center justify-center mx-auto gap-2"
          >
            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : null}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
