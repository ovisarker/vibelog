"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`flex ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[60px] md:ml-[220px] min-h-screen transition-all duration-500">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
