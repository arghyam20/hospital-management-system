# Coding Standards

## 1. Principles
- **SOLID:** Adhere strictly to SOLID object-oriented design principles.
- **DRY (Don't Repeat Yourself):** Extract common logic into helper functions or shared packages (`packages/shared-*`).
- **KISS (Keep It Simple, Stupid):** Avoid premature optimization or over-engineering.
- **YAGNI (You Aren't Gonna Need It):** Do not write code for hypothetical future features.

## 2. Clean Architecture
Code within a microservice must be layered:
1. **Controllers (Presentation):** Handle HTTP/Kafka requests, DTO validation. NO business logic.
2. **Services (Domain/Business):** Core business rules. Calls repositories or ORMs.
3. **ORM/Prisma (Data Access):** Interfaces with the database.

## 3. Naming Conventions
- **Files:** `kebab-case.type.ts` (e.g., `appointment.controller.ts`).
- **Classes:** `PascalCase` (e.g., `AppointmentService`).
- **Variables/Methods:** `camelCase` (e.g., `createAppointment`).
- **Constants/Enums:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).
- **Interfaces:** `PascalCase` (e.g., `CreateUserPayload`). Avoid prefixing with `I` (e.g., NOT `ICreateUser`).

## 4. TypeScript Guidelines
- Enable `strict: true` in `tsconfig.json`.
- Avoid using `any`. Use `unknown` if the type is truly dynamic, then narrow it.
- Explicitly define return types for Controller endpoints.

## 5. Formatting & Linting
- Use Prettier for code formatting (enforced via pre-commit hooks).
- Use ESLint with default NestJS rules.

## 6. Dependency Rules
- Microservices MUST NOT import code directly from another microservice's directory.
- Shared code must reside in the `packages/` directory and be referenced via `package.json` dependencies.
