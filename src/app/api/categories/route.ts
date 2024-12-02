import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories), {
      status: 200, // OK
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500, // Internal Server Error
        headers: { "content-type": "application/json" },
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = await prisma.category.create({
      data: body,
    });
    return new Response(JSON.stringify(category), {
      status: 201, // Created
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create category" }),
      {
        status: 500, // Internal Server Error
        headers: { "content-type": "application/json" },
      },
    );
  }
}