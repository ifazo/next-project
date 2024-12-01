import prisma from "@/lib/prisma";

// GET Request - Fetch a single product by ID
export async function GET(request: Request) {
  try {
    // Extract `id` from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL

    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
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

// PATCH Request - Update a product by ID
export async function PATCH(request: Request) {
  try {
    // Extract `id` from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL

    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

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
    // Extract `id` from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL

    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const product = await prisma.product.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Product deleted", product }), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete product", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
