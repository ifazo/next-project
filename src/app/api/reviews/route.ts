import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("productId");
    if (!id) {
      return new Response("productId query parameter is required", {
        status: 400,
      });
    }
    const reviews = await prisma.review.findMany({
      where: {
        productId: id,
      },
    });
    if (reviews.length === 0) {
      return new Response("No reviews found", { status: 404 });
    }
    return new Response(JSON.stringify(reviews), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const productId = searchParams.get("productId");
    const userEmail = searchParams.get("userEmail");
    if (!productId || !userEmail) {
      return new Response(
        "productId and userEmail query parameters are required",
        {
          status: 400,
        }
      );
    }
    const data = await request.json();
    if (!data) {
      return new Response("Request body is required", { status: 400 });
    }
    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        productId,
        userEmail,
      },
    });
    return new Response(JSON.stringify(review), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}
