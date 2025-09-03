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
        shortCode: Math.random().toString(36).substring(2, 8),
      },
      {
        userId: user.id,
        originalUrl: "https://openai.com",
        shortCode: Math.random().toString(36).substring(2, 8),
      },
    ],
  });

}
