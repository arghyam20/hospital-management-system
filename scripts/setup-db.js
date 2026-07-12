const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appsDir = path.join(__dirname, '..', 'apps');
const apps = fs.readdirSync(appsDir);

apps.forEach(app => {
  const prismaDir = path.join(appsDir, app, 'prisma');
  if (fs.existsSync(prismaDir)) {
    console.log(`\n========================================`);
    console.log(`Setting up database for: ${app}`);
    console.log(`========================================`);
    
    try {
      console.log('Generating Prisma Client...');
      execSync(`npx prisma generate`, { cwd: path.join(appsDir, app), stdio: 'inherit' });
      
      console.log('Pushing Migration...');
      // Note: Assuming DB is accessible and configured in the .env of the service
      execSync(`npx prisma migrate dev --name init`, { cwd: path.join(appsDir, app), stdio: 'inherit' });
      
      const seedFile = path.join(prismaDir, 'seed.ts');
      if (fs.existsSync(seedFile)) {
        console.log('Seeding Database...');
        execSync(`npx prisma db seed`, { cwd: path.join(appsDir, app), stdio: 'inherit' });
      }
    } catch (error) {
      console.error(`Failed to setup database for ${app}. Ensure MySQL is running and the .env is properly configured.`);
    }
  }
});
