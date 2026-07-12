import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Doctor Database...');

  // 1. Create Departments
  const cardiology = await prisma.department.upsert({
    where: { name: 'Cardiology' },
    update: {},
    create: { name: 'Cardiology', description: 'Heart and blood vessels' },
  });

  const neurology = await prisma.department.upsert({
    where: { name: 'Neurology' },
    update: {},
    create: { name: 'Neurology', description: 'Brain and nervous system' },
  });

  // 2. Create Specializations
  const cardiologist = await prisma.specialization.upsert({
    where: { name: 'Cardiologist' },
    update: {},
    create: { name: 'Cardiologist' },
  });

  const neurologist = await prisma.specialization.upsert({
    where: { name: 'Neurologist' },
    update: {},
    create: { name: 'Neurologist' },
  });

  // 3. Create Doctor
  const mockDoctorUserId = '22222222-2222-2222-2222-222222222222';
  
  const doctor = await prisma.doctor.upsert({
    where: { userId: mockDoctorUserId },
    update: {},
    create: {
      userId: mockDoctorUserId,
      firstName: 'Gregory',
      lastName: 'House',
      contactNumber: '+1987654321',
      departmentId: neurology.id,
      specializationId: neurologist.id,
    },
  });

  // 4. Create Schedule
  await prisma.schedule.create({
    data: {
      doctorId: doctor.id,
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '17:00'
    }
  });

  console.log('Doctor seeded:', doctor.id);
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
