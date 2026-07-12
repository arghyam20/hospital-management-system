# AI Agent Customizations

## name: System Rules
## description: Global behavior rules for AI agents generating code in this repository.

### Rule 1: Code Generation Restrictions
Do NOT generate actual application code (NestJS, Next.js, Prisma, SQL, Docker) based on these agent planning documents unless explicitly instructed by the user in a separate execution phase.

### Rule 2: Architecture Compliance
When generating code, you MUST adhere strictly to the rules laid out in the `agents/` directory, specifically:
- Database-per-service isolation (`DATABASE_DESIGN.md`).
- Kafka event-driven decoupling (`EVENT_DRIVEN_ARCHITECTURE.md`).
- Centralized API Gateway routing.

### Rule 3: Single Source of Truth
The Markdown files in the `agents/` directory serve as the absolute truth for the system design. Do not invent new architectural patterns or deviate from the established bounded contexts.
