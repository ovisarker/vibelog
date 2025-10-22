"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      toast.success("Welcome back!");
      window.location.href = "/dashboard";
    } else toast.error(data.error);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        New here?{" "}
        <a href="/register" className="text-indigo-500">
          Create an account
        </a>
      </p>
    </div>
  );
}
