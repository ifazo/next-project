import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const shops = await prisma.shop.findMany();
    return new Response(JSON.stringify(shops), {
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
    const role = request.headers.get("role");
    if (role !== "seller") {
      return new Response(
        JSON.stringify({
          error: "Forbidden: Only sellers can perform this action",
        }),
        { status: 403, headers: { "content-type": "application/json" } }
      );
    }
    const data = await request.json();
    const { name, sellerEmail } = data;
    if (!data) {
      return new Response("Request body is required", { status: 400 });
    }
    const existingShopBySeller = await prisma.shop.findUnique({
      where: {
        sellerEmail,
      },
    });

    if (existingShopBySeller) {
      return new Response(
        JSON.stringify({ error: "Seller already owns a shop" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }
    const existingShopByName = await prisma.shop.findUnique({
      where: {
        name,
      },
    });
    if (existingShopByName) {
      return new Response(
        JSON.stringify({ error: "Shop with this name already exists" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const shop = await prisma.shop.create({
      data,
    });
    return new Response(JSON.stringify(shop), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
