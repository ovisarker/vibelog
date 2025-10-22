import { NextResponse } from "next/server";
import { loginUser, generateToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await loginUser(email, password);
    const token = generateToken(user);

    return NextResponse.json(
      { success: true, token, user: { name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
