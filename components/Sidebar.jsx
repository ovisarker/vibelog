"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Profile", href: "/profile", icon: "👤" },
    { name: "Moods", href: "/moods", icon: "🧠" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-900 text-gray-100 min-h-screen transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <h1
          className={`text-lg font-bold transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 w-0"
          }`}
        >
          VibeLog
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          ☰
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded-md transition-all ${
              pathname === item.href
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <span>🚪</span>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
