// app/api/moods/route.js

export async function GET() {
  try {
    const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods");
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch moods" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/api/v1/moods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to create mood" }, { status: 500 });
  }
}
