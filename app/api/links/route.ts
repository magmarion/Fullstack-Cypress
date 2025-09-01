// app/api/links/route.ts
import { db } from "@/prisma/db"

// GET: hämta alla länkar
export async function GET() {
    const links = await db.link.findMany()
    return Response.json(links)
}

// POST: skapa en ny länk
export async function POST(req: Request) {
    const { originalUrl } = await req.json()

    if (!originalUrl || !originalUrl.startsWith("http")) {
        return new Response("Invalid URL", { status: 400 })
    }

    const shortCode = Math.random().toString(36).substring(2, 8)

    const link = await db.link.create({
        data: {
            originalUrl,
            shortCode,
            userId: "test-user-id", // 👈 placeholder tills vi har auth
        },
    })

    return Response.json(link)
}
