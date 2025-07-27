import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: any) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
  }
  const { name, email, password } = body || {};
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  let existing;
  try {
    existing = await prisma.users.findUnique({ where: { email } });
  } catch (err) {
    return NextResponse.json({ error: "Database error: email must be unique. Did you run prisma migrate?" }, { status: 500 });
  }
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }
  const hashed = await hash(password, 10);
  let user;
  try {
    user = await prisma.users.create({
      data: { name, email, password: hashed }
    });
  } catch (err) {
    return NextResponse.json({ error: "Database error: could not create user." }, { status: 500 });
  }
  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
}
