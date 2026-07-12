const fs = require('fs');
const path = require('path');

const packages = [
  'shared-config',
  'shared-kafka',
  'shared-events',
  'shared-dto',
  'shared-types',
  'shared-utils',
  'shared-logger'
];

const basePath = path.join(__dirname, 'packages');

packages.forEach(pkg => {
  const pkgPath = path.join(basePath, pkg);
  fs.mkdirSync(pkgPath, { recursive: true });
  fs.mkdirSync(path.join(pkgPath, 'src'), { recursive: true });

  const packageJson = {
    name: `@hms/${pkg}`,
    version: "1.0.0",
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      "build": "tsc",
      "dev": "tsc --watch"
    },
    dependencies: {},
    devDependencies: {
      "typescript": "^5.4.5"
    }
  };

  fs.writeFileSync(path.join(pkgPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  const tsconfig = {
    "compilerOptions": {
      "target": "ES2021",
      "module": "CommonJS",
      "declaration": true,
      "outDir": "./dist",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true
    },
    "include": ["src"]
  };

  fs.writeFileSync(path.join(pkgPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

  fs.writeFileSync(path.join(pkgPath, 'src', 'index.ts'), `export * from './main';\n`);
  fs.writeFileSync(path.join(pkgPath, 'src', 'main.ts'), `// Entry point for @hms/${pkg}\n`);
});
