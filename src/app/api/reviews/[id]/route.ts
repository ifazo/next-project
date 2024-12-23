import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();
    const { searchParams } = request.nextUrl;
    const userEmail = searchParams.get("userEmail");
    if (!userEmail) {
      return new Response("userEmail query parameters are required", {
        status: 400,
      });
    }
    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      return new Response("Review not found", { status: 404 });
    }
    if (review.userEmail !== userEmail) {
      return new Response(
        JSON.stringify({
          error: "Forbidden: You can only update your own reviews",
        }),
        { status: 403, headers: { "content-type": "application/json" } }
      );
    }
    const updateReview = await prisma.review.update({
      where: { id },
      data: body,
    });
    return new Response(JSON.stringify(updateReview), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return new Response(JSON.stringify({ error: "Failed to update review" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const { searchParams } = request.nextUrl;
    const userEmail = searchParams.get("userEmail");
    if (!userEmail) {
      return new Response("userEmail query parameters are required", {
        status: 400,
      });
    }
    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      return new Response("Review not found", { status: 404 });
    }
    if (review.userEmail !== userEmail) {
      return new Response(
        JSON.stringify({
          error: "Forbidden: You can only delete your own reviews",
        }),
        { status: 403, headers: { "content-type": "application/json" } }
      );
    }
    const deleteReview = await prisma.review.delete({
      where: { id },
    });
    return new Response(JSON.stringify(deleteReview), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return new Response(JSON.stringify({ error: "Failed to delete review" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
