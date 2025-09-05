import { db } from "@/prisma/db"
import { redirect } from "next/navigation"

/**
 * Redirect a short link to the original URL.
 *
 * @example
 * The link /abc123 will redirect to the original URL stored in the database.
 *
 * @param {object} props
 * @prop {string} params.shortCode The short code of the link.
 * @returns A redirect to the original URL of the link.
 */
export default async function ShortRedirect({ params }: { params: { shortCode: string } }) {
    const link = await db.link.findUnique({ where: { shortCode: params.shortCode } })
    if (!link) return <h1>404 – Link not found</h1>
    redirect(link.originalUrl)
}
