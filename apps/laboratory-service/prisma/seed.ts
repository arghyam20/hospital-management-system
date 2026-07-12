import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Laboratory Database...');

  // 1. Create Test Types
  const cbc = await prisma.testType.upsert({
    where: { name: 'Complete Blood Count (CBC)' },
    update: {},
    create: {
      name: 'Complete Blood Count (CBC)',
      description: 'Measures different features of your blood, including RBCs, WBCs, and platelets.',
      price: 50.0,
    },
  });

  const lipidPanel = await prisma.testType.upsert({
    where: { name: 'Lipid Panel' },
    update: {},
    create: {
      name: 'Lipid Panel',
      description: 'Measures lipids—fats and fatty substances used as a source of energy by your body.',
      price: 75.0,
    },
  });

  // 2. Mock a test with sample and result
  const test = await prisma.test.create({
    data: {
      patientId: 'patient-uuid-123',
      doctorId: 'doctor-uuid-123',
      testTypeId: cbc.id,
      status: 'COMPLETED',
      samples: {
        create: {
          type: 'BLOOD',
          collectedBy: 'tech-id-123',
          status: 'ANALYZED'
        }
      },
      results: {
        create: {
          findings: '{"WBC": 8500, "RBC": 4.5}',
          conclusion: 'Normal values',
          analyzedBy: 'pathologist-id-123'
        }
      }
    }
  });

  console.log('Test seeded:', test.id);
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
