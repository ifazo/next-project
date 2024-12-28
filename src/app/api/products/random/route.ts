import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const allProduct = await prisma.product.findMany();

    const shuffled = allProduct.sort(() => Math.random() - 0.5);

    const products = shuffled.slice(0, 6);
    return new Response(JSON.stringify(products), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "content-type": "application/json" },
    });
  }
}