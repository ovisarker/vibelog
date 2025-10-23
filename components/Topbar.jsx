"use client";
import { useState } from "react";
import { Bell, Sun, Moon, ChevronDown, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Topbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = {
    name: "Ovi Sarker",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Ovi",
    status: "online",
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-3 border-b border-gray-700 bg-gray-900/80 backdrop-blur-md sticky top-0 z-40">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold tracking-wide">💫 VibeLog</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="hover:bg-gray-800 p-2 rounded-full transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification */}
        <button className="relative hover:bg-gray-800 p-2 rounded-full transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-lg transition"
          >
            <div className="relative">
              <Image
                src={user.avatar}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full border border-gray-700"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <span className="hidden md:block">{user.name}</span>
            <ChevronDown size={16} className="hidden md:block" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
              >
                <ul className="py-1 text-sm text-gray-200">
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer">
                    <User size={16} /> Profile
                  </li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-400">
                    <LogOut size={16} /> Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
