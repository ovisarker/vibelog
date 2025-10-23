"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar, Mail, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/users/1"
        );
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
        No user data found.
      </div>
    );

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-10 space-y-4 text-center transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-center">
        <Image
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name || "Guest"}`}
          alt="avatar"
          width={128}
          height={128}
          className="rounded-full"
          priority
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-2">
        {user.name}
      </h2>

      <div className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
        <p className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> {user.email}
        </p>
        <p className="flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" /> Joined:{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
        <p>Mood Entries: {user.moodCount || 0}</p>
        <p>Streak: {user.streak || 0} days</p>
        <p>Average Mood: 😊</p>
      </div>

      <div className="flex justify-center mt-3">
        <Smile className="text-indigo-500" />
      </div>
    </motion.div>
  );
}
