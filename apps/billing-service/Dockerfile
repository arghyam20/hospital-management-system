FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared-dto/package.json packages/shared-dto/
COPY packages/shared-events/package.json packages/shared-events/
COPY packages/shared-kafka/package.json packages/shared-kafka/
COPY apps/billing-service/package.json apps/billing-service/

RUN pnpm install --frozen-lockfile

COPY . .

RUN cd apps/billing-service && npx prisma generate

RUN pnpm --filter billing-service build

FROM node:20-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./

COPY --from=builder /app/apps/billing-service/dist ./apps/billing-service/dist
COPY --from=builder /app/apps/billing-service/package.json ./apps/billing-service/package.json
COPY --from=builder /app/apps/billing-service/prisma ./apps/billing-service/prisma
COPY --from=builder /app/packages ./packages

RUN pnpm install --prod --frozen-lockfile

RUN cd apps/billing-service && npx prisma generate

WORKDIR /app/apps/billing-service

EXPOSE 3005

CMD ["node", "dist/main.js"]
