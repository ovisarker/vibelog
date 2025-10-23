export async function GET() {
  try {
    const res = await fetch("https://68f9a434ef8b2e621e7cf4fa.mockapi.io/users");
    const users = await res.json();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
