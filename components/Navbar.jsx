"use client";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <h1 className="text-xl font-semibold">VibeLog</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
}
