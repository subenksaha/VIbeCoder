export default function GET() {
    return new Response(
        JSON.stringify({
        message: "This is a placeholder for the API route. Implement your logic here.",
        }),
        {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
}