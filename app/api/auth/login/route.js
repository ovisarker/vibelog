export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/users");
    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user)
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });

    return new Response(JSON.stringify({ message: "Login successful", user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
