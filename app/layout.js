// app/layout.js
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "VibeLog",
  description: "Mood tracking app with MockAPI backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="transition-all duration-500">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
