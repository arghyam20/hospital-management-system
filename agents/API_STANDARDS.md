# API Standards

## Gateway vs Microservices
- **External Clients** communicate *only* with the API Gateway via HTTP REST.
- **Internal Services** communicate *only* via Apache Kafka (RPC or Events).

## REST Resource Naming
- Use standard HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Resource names must be nouns and plural: `/api/v1/patients`, `/api/v1/doctors`.
- Sub-resources: `/api/v1/patients/:id/appointments`.

## Request Validation
- All HTTP requests to the Gateway MUST be validated using NestJS `ValidationPipe` and `class-validator` DTOs.
- DTOs should reside in `packages/shared-dto` so they can be utilized by both the Gateway and the validating microservice.
- Strip unknown properties: `whitelist: true`.

## Status Codes
- `200 OK`: Standard success.
- `201 Created`: Resource successfully created (must include `Location` header if applicable).
- `204 No Content`: Successful deletion, no body returned.
- `400 Bad Request`: Validation failure.
- `401 Unauthorized`: Missing or invalid JWT.
- `403 Forbidden`: Valid JWT, but insufficient role permissions.
- `404 Not Found`: Resource does not exist.
- `409 Conflict`: Resource state conflict (e.g., booking an already booked slot).
- `500 Internal Server Error`: Unhandled exception (must not leak stack traces to client).

## Documentation
- Use Swagger/OpenAPI decorators (`@ApiProperty`, `@ApiOperation`) on all Gateway controllers and DTOs.
- The Gateway must expose a `/docs` endpoint for interactive API exploration.
