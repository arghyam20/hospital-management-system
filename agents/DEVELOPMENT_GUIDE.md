# Development Guide

## Local Setup
1. Clone the repository.
2. Install dependencies: `pnpm install` (from the root).
3. Start infrastructure: `docker-compose up -d` (starts MySQL, Zookeeper, Kafka, Redis).
4. Run migrations: `pnpm --filter <service-name> prisma migrate dev`
5. Seed database: `pnpm --filter <service-name> prisma db seed`
6. Start dev server: `pnpm dev`

## Branching Strategy (GitFlow)
- `main`: Production-ready code.
- `develop`: Integration branch for upcoming features.
- `feature/*`: For new features (branch off `develop`).
- `hotfix/*`: For emergency fixes (branch off `main`).

## Commit Rules
Use Conventional Commits:
- `feat: add appointment booking endpoint`
- `fix: resolve patient id validation error`
- `docs: update API documentation`
- `chore: update dependencies`
