import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Appointment Database...');

  // Mock patient and doctor IDs from their respective databases
  const mockPatientId = 'patient-uuid-123';
  const mockDoctorId = 'doctor-uuid-123';

  const appointment = await prisma.appointment.create({
    data: {
      patientId: mockPatientId,
      doctorId: mockDoctorId,
      date: new Date(),
      startTime: '10:00',
      endTime: '10:30',
      status: 'SCHEDULED',
      type: 'CONSULTATION',
      bookings: {
        create: {
          source: 'ONLINE',
          status: 'CONFIRMED'
        }
      }
    },
  });

  const slot = await prisma.slot.create({
    data: {
      doctorId: mockDoctorId,
      date: new Date(),
      startTime: '10:00',
      endTime: '10:30',
      isAvailable: false
    }
  });

  console.log('Appointment seeded:', appointment.id);
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
