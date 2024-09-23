export async function GET() {
    return new Response(
        JSON.stringify({ message: "Hello World! from next.js server !!!" }),
        {
            headers: { "content-type": "application/json" },
        },
    );
}
