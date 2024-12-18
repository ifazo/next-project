import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const allShop = await prisma.shop.findMany();

    const shuffled = allShop.sort(() => Math.random() - 0.5);

    const shops = shuffled.slice(0, 3);
    return new Response(JSON.stringify(shops), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}