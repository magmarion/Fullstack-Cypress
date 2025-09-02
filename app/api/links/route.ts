// app/api/links/route.ts
import { db } from "@/prisma/db";

export async function POST(req: Request) {
    try {
        const { originalUrl } = await req.json();

        if (!originalUrl || !originalUrl.startsWith("http")) {
            return new Response(
                JSON.stringify({ error: "Invalid URL" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hämta första user från databasen
        const user = await db.user.findFirst();
        if (!user) throw new Error("No user found");

        const link = await db.link.create({
            data: {
                originalUrl,
                shortCode: Math.random().toString(36).substring(2, 8),
                userId: user.id,
            },
        });

        return new Response(JSON.stringify(link), { headers: { "Content-Type": "application/json" } });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
