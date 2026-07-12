const { execSync } = require('child_process');

const apps = [
  'appointment-service',
  'billing-service',
  'pharmacy-service',
  'laboratory-service',
  'notification-service',
  'audit-service',
];

apps.forEach(app => {
  console.log(`Scaffolding ${app}...`);
  execSync(`npx @nestjs/cli new ${app} --directory apps/${app} --skip-git --skip-install --package-manager pnpm`, { stdio: 'inherit' });
});
