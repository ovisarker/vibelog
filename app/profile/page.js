"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Smile, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from MockAPI
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/users/1");

        if (!res.ok) {
          toast.error(`API Error: ${res.status}`);
          setUser(null);
          return;
        }

        const json = await res.json();
        setUser(json);
      } catch (error) {
        console.error("Profile fetch failed:", error);
        toast.error("Failed to load user profile");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        <h1 className="text-3xl font-bold mb-10 flex items-center gap-2">
          <User className="text-indigo-500" /> Profile
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
          </div>
        ) : !user ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No user data found 😔</p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            variants={fadeUp}
          >
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

            {/* Profile Content */}
            <div className="relative -mt-14 px-6 pb-8 text-center">
              <div className="inline-block bg-white dark:bg-gray-900 p-2 rounded-full shadow-md">
               <Image src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`} width={128} height={128} />

              </div>

              <h2 className="text-2xl font-bold mt-4">{user.name || "Unknown User"}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2 flex justify-center items-center gap-2 text-sm">
                <Mail size={16} /> {user.email || "No email provided"}
              </p>
              <p className="text-xs text-gray-400 flex justify-center items-center gap-2">
                <Calendar size={14} /> Joined:{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
              >
                <motion.div
                  variants={fadeUp}
                  className="bg-indigo-50 dark:bg-gray-900 p-4 rounded-xl shadow text-center"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mood Entries</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {user.moodCount || 0}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="bg-indigo-50 dark:bg-gray-900 p-4 rounded-xl shadow text-center"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {user.streak || 3} days
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="bg-indigo-50 dark:bg-gray-900 p-4 rounded-xl shadow text-center sm:col-span-1 col-span-2"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">Average Mood</p>
                  <div className="flex justify-center mt-1">
                    <Smile className="text-yellow-500 w-6 h-6" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
