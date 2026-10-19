/**
 * One-off cleanup script: removes contact-form test rows
 * (source="website" AND email="test@example.com") so the DB ships clean.
 *
 * Run: bun scripts/cleanup-test-rows.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.contactSubmission.deleteMany({
    where: { source: "website", email: "test@example.com" },
  });
  console.log(`Deleted ${deleted.count} test submission(s).`);
  const remaining = await prisma.contactSubmission.count();
  console.log(`Remaining contact submissions: ${remaining}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
