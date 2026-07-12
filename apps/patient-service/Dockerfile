FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared-dto/package.json packages/shared-dto/
COPY packages/shared-events/package.json packages/shared-events/
COPY packages/shared-kafka/package.json packages/shared-kafka/
COPY apps/patient-service/package.json apps/patient-service/

RUN pnpm install --frozen-lockfile

COPY . .

RUN cd apps/patient-service && npx prisma generate

RUN pnpm --filter patient-service build

FROM node:20-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./

COPY --from=builder /app/apps/patient-service/dist ./apps/patient-service/dist
COPY --from=builder /app/apps/patient-service/package.json ./apps/patient-service/package.json
COPY --from=builder /app/apps/patient-service/prisma ./apps/patient-service/prisma
COPY --from=builder /app/packages ./packages

RUN pnpm install --prod --frozen-lockfile

RUN cd apps/patient-service && npx prisma generate

WORKDIR /app/apps/patient-service

EXPOSE 3002

CMD ["node", "dist/main.js"]
