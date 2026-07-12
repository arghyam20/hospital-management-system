# Folder Structure

The project utilizes a Monorepo architecture managed by pnpm workspaces (and potentially Turborepo).

## Root Level
```
hospital-management-system/
├── apps/                 # NestJS and Next.js applications
├── packages/             # Shared libraries and internal packages
├── agents/               # AI Architecture & Documentation
├── scripts/              # Infrastructure setup scripts
├── docker-compose.yml    # Local development infrastructure
├── package.json          # Root workspace configuration
└── pnpm-workspace.yaml   # Workspace definitions
```

## Microservice Structure (`apps/<service-name>`)
Each backend microservice is a standard NestJS application.
```
apps/appointment-service/
├── prisma/
│   ├── schema.prisma     # Database schema specific to this service
│   ├── seed.ts           # Initial data seed
│   └── migrations/       # SQL migrations
├── src/
│   ├── app.module.ts     # Root module
│   ├── main.ts           # Entry point (Kafka configuration)
│   ├── appointment.controller.ts # Message and Event handlers
│   └── appointment.service.ts    # Business logic and Prisma integration
├── package.json
└── tsconfig.json
```

## Shared Packages (`packages/`)
```
packages/
├── shared-dto/           # Global validation DTOs used by Gateway and Microservices
│   ├── src/
│   │   ├── auth.dto.ts
│   │   ├── patient.dto.ts
│   │   └── main.ts
│   └── package.json
├── shared-events/        # Kafka topic enumerations and interface definitions
├── shared-kafka/         # Dynamic NestJS module for rapid Kafka Client injection
```

## Frontend (`apps/web` or `apps/frontend`)
```
apps/web/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable React components (UI library)
│   ├── lib/              # API clients, utilities
│   └── types/            # Frontend TypeScript definitions
```
