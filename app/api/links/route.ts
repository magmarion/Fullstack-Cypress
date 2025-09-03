// app/api/links/route.ts
import { db } from "@/prisma/db";

export async function GET() {
    try {
        const links = await db.link.findMany();
        return new Response(JSON.stringify(links), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

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
        let user = await db.user.findFirst();
        if (!user) {
            // Skapa testuser om ingen finns
            user = await db.user.create({
                data: { email: "test@example.com", password: "hashedpassword" },
            });
        }

        const link = await db.link.create({
            data: {
                originalUrl,
                shortCode: Math.random().toString(36).substring(2, 8), 
                userId: user.id,
            },
        });

        return new Response(JSON.stringify(link), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
