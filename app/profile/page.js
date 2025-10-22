"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("system");
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          setTheme(data.user.theme || "system");
          setBudget(data.user.budget || 0);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, budget }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (!user) return <div className="p-6 text-center text-gray-400">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-gray-800 p-6 rounded-2xl max-w-lg mx-auto space-y-5">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Name</label>
          <input
            value={user.name}
            readOnly
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <input
            value={user.email}
            readOnly
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Monthly Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Theme Preference</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-300"
          >
            <option value="system">System Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded transition mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
