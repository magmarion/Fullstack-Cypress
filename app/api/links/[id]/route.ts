// app/api/links/[id]/route.ts
import { db } from "@/prisma/db"
import { NextResponse } from "next/server"

type Params = {
    params: { id: string }
}

// DELETE: ta bort en länk
export async function DELETE(req: Request, { params }: Params) {
    try {
        const { id } = params

        if (!id) {
            return NextResponse.json(
                { error: "Missing ID" },
                { status: 400 }
            )
        }

        await db.link.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Deleted successfully" })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        )
    }
}
