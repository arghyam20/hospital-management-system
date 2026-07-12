# Testing Strategy

## 1. Unit Testing
- **Scope:** Individual classes, functions, and services.
- **Tool:** Jest.
- **Implementation:** Mock all external dependencies (Prisma, Kafka Client, external HTTP requests). 
- **Goal:** Validate core business logic and conditional branches (e.g., checking if `totalAmount` is calculated correctly in the Billing Service).

## 2. Integration Testing
- **Scope:** Interaction between the Service layer and the Database.
- **Tool:** Jest + Testcontainers.
- **Implementation:** Spin up an isolated MySQL Docker container via Testcontainers. Run Prisma migrations, execute service logic, and assert database state.

## 3. E2E (End-to-End) Testing
- **Scope:** The entire application stack (API Gateway -> Kafka -> Microservice -> Database).
- **Tool:** Supertest + Jest.
- **Implementation:** Simulate real HTTP requests hitting the API Gateway and verify the final HTTP response.

## 4. Kafka / Contract Testing
- Ensuring that producers and consumers agree on the event schemas.
- Use schema registries or shared TypeScript interfaces (`packages/shared-events`) to enforce strict type checking at compile time, reducing the need for complex runtime contract tests.

## 5. Load Testing
- **Scope:** System throughput and bottleneck identification.
- **Tool:** k6 or Artillery.
- **Implementation:** Simulate 1000s of concurrent users logging in and booking appointments to verify Kafka broker throughput and database connection pool limits.
