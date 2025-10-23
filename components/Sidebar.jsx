"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BarChart3,
  User,
  Smile,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ isMobile, open, setOpen }) {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
    { name: "Profile", href: "/profile", icon: <User size={20} /> },
    { name: "Moods", href: "/moods", icon: <Smile size={20} /> },
    { name: "Analytics", href: "/analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || !isMobile) && (
          <motion.aside
            initial={{ x: isMobile ? -250 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? -250 : 0 }}
            transition={{ type: "tween" }}
            className="fixed top-0 left-0 h-screen w-60 bg-gray-900 text-gray-200 flex flex-col shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h1 className="text-xl font-bold">VibeLog 💫</h1>
              {isMobile && (
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => isMobile && setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-gray-700">
              <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
