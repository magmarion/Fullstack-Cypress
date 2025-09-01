// prisma/seed/seed-links.ts
import { db } from "../db"

export async function seedLinks() {
  const user = await db.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: { email: "test@example.com", password: "hashedpassword" },
  })

  await db.link.createMany({
    data: [
      {
        userId: user.id,
        originalUrl: "https://example.com",
        shortCode: "abc123",
      },
      {
        userId: user.id,
        originalUrl: "https://openai.com",
        shortCode: "xyz789",
      },
    ],
  })
}
