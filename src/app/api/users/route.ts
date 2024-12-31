import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password } = data;
    if (!data) {
      return new Response("Request body is required", { status: 400 });
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}
