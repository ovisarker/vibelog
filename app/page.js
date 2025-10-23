export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-3">Welcome to 💫 VibeLog</h1>
      <a
        href="/dashboard"
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-md text-lg font-semibold"
      >
        Go to Dashboard →
      </a>
    </main>
  );
}
