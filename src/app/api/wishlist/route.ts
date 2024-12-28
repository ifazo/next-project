import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const user = searchParams.get("userEmail");
    if (!user) {
      return new Response("userEmail query parameter is required", {
        status: 400,
      });
    }
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userEmail: user,
      },
    });
    if (wishlist.length === 0) {
      return new Response(JSON.stringify(null), {
        headers: { "content-type": "application/json" },
        status: 404,
      });
    }
    return new Response(JSON.stringify(wishlist), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data || !data.productId || !data.userEmail) {
      return new Response(
        "Request body is required with valid productId and userEmail",
        { status: 400 }
      );
    }
    const review = await prisma.wishlist.create({
      data: {
        productId: data.productId,
        userEmail: data.userEmail,
      },
    });
    return new Response(JSON.stringify(review), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
      status: 500,
    });
  }
}
