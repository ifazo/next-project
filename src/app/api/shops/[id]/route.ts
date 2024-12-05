import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  try {
    const shops = await prisma.shop.findUnique({
      where: { id },
    });
    return new Response(JSON.stringify(shops), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching shops:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch shops" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const body = await request.json();
  const role = request.headers.get("role");
  if (role !== "admin") {
    return new Response(
      JSON.stringify({
        error: "Forbidden: Only admins can perform this action",
      }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }
  try {
    const shop = await prisma.shop.update({
      where: { id },
      data: body,
    });
    return new Response(JSON.stringify(shop), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating shop:", error);
    return new Response(JSON.stringify({ error: "Failed to update shop" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const role = request.headers.get("role");
  if (role !== "admin") {
    return new Response(
      JSON.stringify({
        error: "Forbidden: Only admins can perform this action",
      }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }
  try {
    const shop = await prisma.shop.delete({
      where: { id },
    });
    return new Response(JSON.stringify(shop), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting shop:", error);
    return new Response(JSON.stringify({ error: "Failed to delete shop" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
