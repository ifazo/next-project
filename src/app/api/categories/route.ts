import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const activeCategories = await prisma.category.findMany({
      where: {
        status: "active",
      },
    });
    return new Response(JSON.stringify(activeCategories), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // const role = request.headers.get("role");
    // if (role !== "admin") {
    //   return new Response(
    //     JSON.stringify({
    //       error: "Forbidden: Only admins can perform this action",
    //     }),
    //     { status: 403, headers: { "content-type": "application/json" } }
    //   );
    // }
    const category = await prisma.category.create({
      data: body,
    });
    return new Response(JSON.stringify(category), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create category" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
