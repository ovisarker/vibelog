// app/dashboard/layout.js
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[60px] md:ml-[220px] min-h-screen bg-gray-950 text-white p-8 transition-all duration-500">
        {children}
      </main>
    </div>
  );
}
