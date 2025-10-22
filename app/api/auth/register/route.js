import { NextResponse } from "next/server";
import { registerUser, generateToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const user = await registerUser(name, email, password);
    const token = generateToken(user);

    return NextResponse.json(
      { success: true, token, user: { name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
