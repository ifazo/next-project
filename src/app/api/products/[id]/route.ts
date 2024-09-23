import { getProductById } from "@/db/queries/select";

export async function GET({ id }: { id: number }) {
    const product = await getProductById(id);
    return new Response(JSON.stringify(product), {
        headers: { "content-type": "application/json" },
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    return new Response(JSON.stringify(body), {
        headers: { "content-type": "application/json" },
    });
}