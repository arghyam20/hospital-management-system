FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared-dto/package.json packages/shared-dto/
COPY packages/shared-events/package.json packages/shared-events/
COPY packages/shared-kafka/package.json packages/shared-kafka/
COPY apps/appointment-service/package.json apps/appointment-service/

RUN pnpm install --frozen-lockfile

COPY . .

RUN cd apps/appointment-service && npx prisma generate

RUN pnpm --filter appointment-service build

FROM node:20-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./

COPY --from=builder /app/apps/appointment-service/dist ./apps/appointment-service/dist
COPY --from=builder /app/apps/appointment-service/package.json ./apps/appointment-service/package.json
COPY --from=builder /app/apps/appointment-service/prisma ./apps/appointment-service/prisma
COPY --from=builder /app/packages ./packages

RUN pnpm install --prod --frozen-lockfile

RUN cd apps/appointment-service && npx prisma generate

WORKDIR /app/apps/appointment-service

EXPOSE 3004

CMD ["node", "dist/main.js"]
