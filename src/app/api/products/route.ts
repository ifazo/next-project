import { getProducts } from "@/db/queries/select";

export async function GET() {
    try {
        const products = await getProducts();
        return new Response(JSON.stringify(products), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Do something with the body, like saving to the database
        return new Response(JSON.stringify(body), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 400,
            headers: { "content-type": "application/json" },
        });
    }
}
