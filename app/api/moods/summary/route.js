// app/api/moods/summary/route.js

export async function GET() {
  try {
    const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods");
    const moods = await res.json();

    // Calculate frequency of each mood type
    const summary = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    return Response.json(summary);
  } catch (err) {
    return Response.json({ error: "Failed to summarize moods" }, { status: 500 });
  }
}
