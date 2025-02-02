import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const email = searchParams.get("sellerEmail");
    if (email) {
      const shop = await prisma.shop.findUnique({
        where: {
          sellerEmail: email,
        },
      });
      return new Response(JSON.stringify(shop), {
        headers: { "content-type": "application/json" },
      });
    }
    const activeShops = await prisma.shop.findMany({
      where: {
        status: "active",
      },
    });
    return new Response(JSON.stringify(activeShops), {
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
    if (!data) {
      return new Response("Request body is required", { status: 400 });
    }
    const { name, sellerEmail } = data;
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
