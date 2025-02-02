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
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;
    const shopNames = searchParams.get("shopNames")?.split(",") || [];
    const categorySlugs = searchParams.get("categorySlugs")?.split(",") || [];
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "1000");

    const whereClause: {
      name?: { contains: string; mode: "insensitive" };
      OR?: Array<{
        shop?: { name: { in: string[] } };
        category?: { slug: { in: string[] } };
      }>;
      price?: { gte: number; lte: number };
    } = {};

    if (search) {
      whereClause.name = { contains: search, mode: "insensitive" };
    }

    if (shopNames.length > 0 || categorySlugs.length > 0) {
      whereClause.OR = [];

      if (shopNames.length > 0) {
        whereClause.OR.push({
          shop: {
            name: {
              in: shopNames,
            },
          },
        });
      }

      if (categorySlugs.length > 0) {
        whereClause.OR.push({
          category: {
            slug: {
              in: categorySlugs,
            },
          },
        });
      }
    }

    if (minPrice || maxPrice) {
      whereClause.price = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    const totalProducts = await prisma.product.count({
      where: whereClause,
    });

    const products = await prisma.product.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        shop: true,
        category: true,
      },
    });

    return new Response(JSON.stringify({ products, totalProducts }), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching products", details: error }),
      {
        headers: { "content-type": "application/json" },
        status: 500,
      }
    );
  }
}