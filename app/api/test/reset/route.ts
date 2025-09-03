import { NextResponse } from "next/server"
import { db } from "@/prisma/db"

export async function POST() {
    try {
        // töm databasen
        await db.link.deleteMany({})
        await db.user.deleteMany({})

        // lägg till en test-user så att userId alltid finns
        const user = await db.user.create({
            data: {
                email: "test@example.com",
                password: "hashedpassword", // dummy
            },
        })

        return NextResponse.json({ message: "Database reset", userId: user.id })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to reset DB" }, { status: 500 })
    }
}
