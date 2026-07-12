# Configuration

## Configuration Management
- NestJS applications use the `@nestjs/config` module for centralized configuration management.
- This provides strong typing and validation of environment variables at startup.

## Typical Config Schema (`config.ts`)
Every microservice must validate its environment on boot:
- `PORT`: Int
- `DATABASE_URL`: Valid URL
- `KAFKA_BROKERS`: Comma separated string
- `JWT_SECRET`: (Only in Auth/Gateway)

## Failure Mode
If a microservice is started without a required configuration variable, it MUST crash immediately with a clear error message (Fail-fast principle).
