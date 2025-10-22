"use client";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Profile", link: "/profile" },
    { label: "Settings", link: "/settings" },
  ];

  return (
    <aside
      className={`${
        open ? "w-56" : "w-16"
      } bg-indigo-700 text-white h-screen p-3 transition-all duration-300 flex flex-col`}
    >
      <button
        className="mb-6 text-lg font-bold"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.link}
            className="block hover:bg-indigo-600 p-2 rounded"
          >
            {open ? item.label : item.label[0]}
          </a>
        ))}
      </nav>
    </aside>
  );
}
