import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Pharmacy Database...');

  // 1. Create Medicine with Inventory
  const paracetamol = await prisma.medicine.upsert({
    where: { name: 'Paracetamol 500mg' },
    update: {},
    create: {
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      unitPrice: 2.5,
      requiresPrescription: false,
      inventory: {
        create: {
          quantity: 1000,
          reorderLevel: 100,
        }
      }
    },
  });

  const amoxicillin = await prisma.medicine.upsert({
    where: { name: 'Amoxicillin 250mg' },
    update: {},
    create: {
      name: 'Amoxicillin 250mg',
      genericName: 'Amoxicillin',
      unitPrice: 15.0,
      requiresPrescription: true,
      inventory: {
        create: {
          quantity: 500,
          reorderLevel: 50,
        }
      }
    },
  });

  // 2. Create mock Prescription
  const prescription = await prisma.prescription.create({
    data: {
      patientId: 'patient-uuid-123',
      doctorId: 'doctor-uuid-123',
      items: {
        create: [
          {
            medicineId: paracetamol.id,
            dosage: '500mg',
            frequency: 'Twice a day',
            duration: 5,
            quantity: 10
          },
          {
            medicineId: amoxicillin.id,
            dosage: '250mg',
            frequency: 'Three times a day',
            duration: 7,
            quantity: 21
          }
        ]
      }
    }
  });

  console.log('Prescription seeded:', prescription.id);
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
