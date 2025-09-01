import { db } from "@/prisma/db"
import { redirect } from "next/navigation"

export default async function ShortRedirect({ params }: { params: { shortCode: string } }) {
    // Leta upp länken i databasen
    const link = await db.link.findUnique({
        where: { shortCode: params.shortCode },
    })

    // Om ingen länk hittas, visa 404
    if (!link) {
        return <h1>404 – Link not found</h1>
    }

    // Skicka användaren vidare till original-URL
    redirect(link.originalUrl)
}
