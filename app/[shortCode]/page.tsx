import { db } from "@/prisma/db"
import { redirect } from "next/navigation"

export default async function ShortRedirect({ params }: { params: { shortCode: string } }) {
    const link = await db.link.findUnique({ where: { shortCode: params.shortCode } })
    if (!link) return <h1>404 – Link not found</h1>
    redirect(link.originalUrl)
}
