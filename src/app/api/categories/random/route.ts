import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const allCategory = await prisma.category.findMany();

    const shuffled = allCategory.sort(() => Math.random() - 0.5);

    const categories = shuffled.slice(0, 4);
    return new Response(JSON.stringify(categories), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}