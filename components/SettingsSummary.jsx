"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Bell, BellOff } from "lucide-react";

export default function SettingsSummary() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const storedNotif = localStorage.getItem("notifications") === "true";
    setTheme(storedTheme);
    setNotifications(storedNotif);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-md transition-all"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Settings Overview
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Theme Status */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-indigo-400" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
          <span>
            Theme:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
              {theme}
            </span>
          </span>
        </div>

        {/* Notification Status */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {notifications ? (
            <Bell className="w-5 h-5 text-green-400" />
          ) : (
            <BellOff className="w-5 h-5 text-red-400" />
          )}
          <span>
            Notifications:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {notifications ? "Enabled" : "Disabled"}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
