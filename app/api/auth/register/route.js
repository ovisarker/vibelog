export async function POST(req) {
  try {
    const body = await req.json();

    // Post new user to MockAPI
    const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        password: body.password,
        mood: body.mood || "neutral",
        createdAt: new Date().toISOString()
      })
    });

    if (!res.ok)
      return new Response(JSON.stringify({ message: "Failed to register" }), { status: 400 });

    const user = await res.json();
    return new Response(JSON.stringify({ message: "User registered", user }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
