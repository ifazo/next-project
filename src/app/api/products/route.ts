import prisma from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    const role = request.headers.get("role");
    if (role !== "seller") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: Only seller can create products",
        }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }
    const body = await request.json();
    const product = await prisma.product.create({
      data: body,
    });
    return new Response(JSON.stringify(product), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error creating product", details: error }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const shopName = searchParams.get("shopName") || "";
    const categorySlug = searchParams.get("categorySlug") || "";
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = parseInt(searchParams.get("skip") || "0");
    const sort = searchParams.get("sort") || "asc";
    const price = parseInt(searchParams.get("price") || "0");

    let products;

    if (q) {
      products = await prisma.product.findMany({
        where: {
          OR: [{ name: { contains: q } }, { description: { contains: q } }],
        },
        take: limit,
        skip: skip,
      });
    } else if (shopName) {
      products = await prisma.product.findMany({
        where: {
          shop: {
            name: shopName,
          },
        },
        take: limit,
        skip: skip,
      });
    } else if (categorySlug) {
      products = await prisma.product.findMany({
        where: {
          category: {
            slug: categorySlug,
          },
        },
        take: limit,
        skip: skip,
      });
    } else if (price) {
      products = await prisma.product.findMany({
        where: {
          price: {
            lte: price,
          },
        },
        take: limit,
        skip: skip,
      });
    } else if (sort) {
      products = await prisma.product.findMany({
        orderBy: {
          name: sort === "asc" ? "asc" : "desc",
        },
        take: limit,
        skip: skip,
      });
    } else {
      products = await prisma.product.findMany({
        take: limit,
        skip: skip,
      });
    }

    return new Response(JSON.stringify(products), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching products", details: error }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  }
}
