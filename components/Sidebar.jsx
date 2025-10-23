"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
    { name: "Profile", href: "/profile", icon: <User size={20} /> },
    { name: "Moods", href: "/moods", icon: <Smile size={20} /> },
    { name: "Analytics", href: "/analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ width: open ? 220 : 60 }}
      className="h-screen bg-gray-900 text-gray-200 fixed top-0 left-0 flex flex-col shadow-xl z-50"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {open && <h1 className="text-xl font-bold">VibeLog 💫</h1>}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
          >
            {item.icon}
            {open && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-700">
        <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <LogOut size={18} /> {open && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
