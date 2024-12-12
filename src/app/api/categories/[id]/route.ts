import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const categories = await prisma.category.findUnique({
      where: { id },
    });
    return new Response(JSON.stringify(categories), {
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

export async function PATCH(request: Request) {
  try {
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
    const category = await prisma.category.update({
      where: { id },
      data: body,
    });
    return new Response(JSON.stringify(category), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update category" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
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
    const category = await prisma.category.delete({
      where: { id },
    });
    return new Response(JSON.stringify(category), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete category" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
