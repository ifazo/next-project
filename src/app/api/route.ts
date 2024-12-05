export async function GET() {
  return new Response(
    JSON.stringify({ message: "Next api is running successfully!" }),
    {
      headers: { "content-type": "application/json" },
    },
  );
}
