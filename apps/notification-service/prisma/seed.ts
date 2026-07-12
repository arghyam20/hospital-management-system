import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Notification Database...');

  // 1. Create Templates
  await prisma.template.upsert({
    where: { name: 'APPOINTMENT_BOOKED' },
    update: {},
    create: {
      name: 'APPOINTMENT_BOOKED',
      type: 'EMAIL',
      subject: 'Appointment Confirmation',
      body: 'Dear Patient, your appointment has been successfully booked for {{date}} at {{startTime}}.',
    },
  });

  await prisma.template.upsert({
    where: { name: 'WELCOME_EMAIL' },
    update: {},
    create: {
      name: 'WELCOME_EMAIL',
      type: 'EMAIL',
      subject: 'Welcome to HMS',
      body: 'Hello {{name}}, welcome to our Hospital Management System.',
    },
  });

  console.log('Templates seeded.');
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
