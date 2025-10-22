"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Account created!");
      window.location.href = "/login";
    } else toast.error(data.error);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-500">
          Login
        </a>
      </p>
    </div>
  );
}
