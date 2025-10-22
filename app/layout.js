import "./globals.css";
import FooterCredit from "../components/FooterCredit";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "VibeLog – AI Mood Tracker",
  description: "Developed by Ovi Sarker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
          <FooterCredit />
        </div>
      </body>
    </html>
  );
}
