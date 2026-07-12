import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Billing Database...');

  // 1. Create Tax
  await prisma.tax.upsert({
    where: { name: 'GST' },
    update: {},
    create: { name: 'GST', rate: 0.18 }, // 18%
  });

  // 2. Create Discount
  await prisma.discount.upsert({
    where: { code: 'SUMMER2026' },
    update: {},
    create: { code: 'SUMMER2026', type: 'PERCENTAGE', value: 10 }, // 10%
  });

  // 3. Create mock Invoice
  const invoice = await prisma.invoice.create({
    data: {
      patientId: 'patient-uuid-123',
      appointmentId: 'appointment-uuid-123',
      amount: 1000,
      taxAmount: 180,
      discountAmount: 100,
      totalAmount: 1080,
      status: 'PAID',
      dueDate: new Date(),
      payments: {
        create: {
          amount: 1080,
          paymentMethod: 'CREDIT_CARD',
          status: 'COMPLETED'
        }
      }
    }
  });

  console.log('Invoice seeded:', invoice.id);
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
