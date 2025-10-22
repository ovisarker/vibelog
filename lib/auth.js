import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { dbConnect } from "./dbConnect";

export async function registerUser(name, email, password) {
  await dbConnect();
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return user;
}

export async function loginUser(email, password) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");
  return user;
}

export function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
