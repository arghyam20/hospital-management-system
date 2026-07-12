import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Audit Database...');

  await prisma.auditLog.create({
    data: {
      action: 'SYSTEM_START',
      entityType: 'System',
      entityId: 'global',
      details: '{"message": "Audit service initialized successfully"}',
    }
  });

  console.log('Audit Log seeded.');
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
