import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  const doctorRole = await prisma.role.upsert({
    where: { name: 'DOCTOR' },
    update: {},
    create: { name: 'DOCTOR' },
  });

  const patientRole = await prisma.role.upsert({
    where: { name: 'PATIENT' },
    update: {},
    create: { name: 'PATIENT' },
  });

  // 2. Create Permissions
  const allPermissions = [
    'MANAGE_USERS',
    'VIEW_PATIENTS',
    'EDIT_PATIENTS',
    'BOOK_APPOINTMENTS',
    'MANAGE_BILLING',
  ];

  for (const perm of allPermissions) {
    await prisma.permission.upsert({
      where: { name: perm },
      update: {},
      create: { name: perm },
    });
  }

  // 3. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@hospital.com' },
    update: {},
    create: {
      email: 'admin@hospital.com',
      name: 'System Admin',
      password: adminPassword,
      roleId: adminRole.id,
    },
  });

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
