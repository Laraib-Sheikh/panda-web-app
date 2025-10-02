import {prisma} from "@/app/lib/prisma"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
