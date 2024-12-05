import prisma from "@/lib/prisma";

// GET Request - Fetch a single product by ID
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch product", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const role = request.headers.get("role");
    if (role !== "seller") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: Only seller can update products",
        }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: body,
    });

    return new Response(JSON.stringify(product), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update product", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

// DELETE Request - Delete a product by ID
export async function DELETE(request: Request) {
  try {
    const role = request.headers.get("role");
    if (role !== "seller") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: Only seller can delete products",
        }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const product = await prisma.product.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Product deleted", product }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete product", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
