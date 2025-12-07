import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    return NextResponse.json({ user, token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
