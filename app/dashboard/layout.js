"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar isMobile={isMobile} open={sidebarOpen || !isMobile} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 ml-0 md:ml-[220px] min-h-screen transition-all duration-500">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
