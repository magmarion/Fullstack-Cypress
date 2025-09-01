// app/api/links/route.ts
import { db } from "@/prisma/db"

// GET: hämta alla länkar
export async function GET() {
    const links = await db.link.findMany()
    return Response.json(links)
}

export async function POST(req: Request) {
    try {
        const { originalUrl } = await req.json()

        if (!originalUrl || !originalUrl.startsWith("http")) {
            return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }

        const link = await db.link.create({
            data: {
                originalUrl,
                shortCode: Math.random().toString(36).substring(2, 8),
                userId: "68b45d1bc433b7c3d986cb66", // Hårdkodad userId för enkelhetens skull
            },
        })

        return new Response(JSON.stringify(link), { headers: { "Content-Type": "application/json" } })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
}


