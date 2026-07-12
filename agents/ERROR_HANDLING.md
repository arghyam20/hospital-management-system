# Error Handling

## Global Exception Filter
The API Gateway must implement a Global Exception Filter (`AllExceptionsFilter`) to catch all unhandled errors and format them consistently before returning to the client.

## Standardized Error Response
Every error returned to a client must match this schema:
```json
{
  "statusCode": 404,
  "timestamp": "2026-07-12T10:15:30Z",
  "path": "/api/v1/patients/123",
  "message": "Patient not found",
  "error": "Not Found"
}
```

## Kafka Error Propagation
When a downstream microservice throws an exception (e.g., `NotFoundException`) during an RPC call (`@MessagePattern`), the error is serialized and sent back over Kafka to the API Gateway.
- The Gateway must unwrap this error (often arriving as an `RpcException`) and re-throw it as a standard HTTP exception so the Global Exception Filter can catch it.

## Defensive Programming
- **Null Checks:** Always validate data retrieved from the database before operating on it.
- **Transaction Rollbacks:** Use Prisma `$transaction` for operations modifying multiple tables. If any step fails, the entire block must roll back to prevent orphaned data.

## Sensitive Information
- Never leak database stack traces, Prisma connection errors, or underlying system paths to the client.
- Map low-level ORM errors (e.g., Prisma Unique Constraint Violation `P2002`) to standard HTTP exceptions (e.g., `409 Conflict`).
