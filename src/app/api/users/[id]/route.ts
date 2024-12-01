import prisma from "@/lib/prisma";

// GET Request - Fetch a user by ID
export async function GET(request: Request) {
  try {
    // Extract `id` from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch user", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

// PATCH Request - Update a user by ID
export async function PATCH(request: Request) {
  try {
    // Extract `id` from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const body = await request.json();
    const user = await prisma.user.update({
      where: { id },
      data: body,
    });

    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update user", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

// DELETE Request - Delete a user by ID
export async function DELETE(request: Request) {
  try {
    // Extract `id` from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const user = await prisma.user.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "User deleted", user }), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete user", details: error }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
