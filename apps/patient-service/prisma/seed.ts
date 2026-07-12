import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Patient Database...');

  // Mock a user ID that would come from the Auth service
  const mockUserId = '11111111-1111-1111-1111-111111111111';

  const patient = await prisma.patient.upsert({
    where: { userId: mockUserId },
    update: {},
    create: {
      userId: mockUserId,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Male',
      bloodGroup: 'O+',
      contactNumber: '+1234567890',
      address: {
        create: {
          street: '123 Health St',
          city: 'Medical City',
          state: 'Healthy State',
          zipCode: '12345',
          country: 'USA',
        }
      },
      emergencyContact: {
        create: {
          name: 'Jane Doe',
          relation: 'Spouse',
          contactNumber: '+0987654321',
        }
      }
    },
  });

  console.log('Patient seeded:', patient.id);
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
