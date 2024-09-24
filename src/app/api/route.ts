export async function GET() {
  return new Response(
    JSON.stringify({ message: "Hello World! from next.js api !!!" }),
    {
      headers: { "content-type": "application/json" },
    },
  );
}
