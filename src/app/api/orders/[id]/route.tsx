import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  try {
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        products: true,
      },
    });

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch order" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
