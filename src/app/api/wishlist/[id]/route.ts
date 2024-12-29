import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const email = request.headers.get("email");
  const findWishlist = await prisma.wishlist.findUnique({
    where: { id },
  });
  if (!findWishlist) {
    return new Response(
      JSON.stringify({ error: "Wishlist not found" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );
  }
  if (email !== findWishlist.userEmail) {
    return new Response(
      JSON.stringify({
        error: "Forbidden: Only owner can perform this action",
      }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }
  try {
    const wishlist = await prisma.wishlist.delete({
      where: { id },
    });
    return new Response(JSON.stringify(wishlist), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete wishlist" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
