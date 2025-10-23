// app/page.js
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white text-center p-6">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">💫 Welcome to VibeLog</h1>
      <p className="text-lg max-w-xl mb-8 text-gray-200">
        Track your daily moods, visualize your emotional patterns, and grow with self-awareness 🌿
      </p>
      <a
        href="/dashboard"
        className="bg-white text-purple-800 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition"
      >
        Go to Dashboard →
      </a>
    </main>
  );
}
