// prisma/seed/seed-db.ts
import { db } from "../db"
import { seedLinks } from "./seed-links"

export async function seedDatabase(opts: { drop?: boolean } = {}) {
  if (opts.drop) {
    await db.$runCommandRaw({ dropDatabase: 1 })
  }
  await seedLinks()
}
