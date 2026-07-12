# Logging Strategy

## 1. Application Logging
- Use a structured logging library (e.g., `pino` or `winston`) across all NestJS services.
- Logs must be output in JSON format in production to allow seamless ingestion by log aggregators (ELK stack, Datadog).
- **Log Levels:**
  - `ERROR`: System faults, unhandled exceptions.
  - `WARN`: Recoverable errors, retries, rate limits hit.
  - `INFO`: Significant lifecycle events (Service started, Database connected).
  - `DEBUG`: Tracing logic for development.

## 2. Request Logging
- The API Gateway must log all incoming HTTP requests.
- Log payload: Method, URL, User ID (if authenticated), Status Code, Response Time (ms), IP Address.
- **Scrubbing:** Never log passwords, tokens, or PII/PHI in request payloads.

## 3. Audit Logging (Business Level)
- Distinct from standard application logs, **Audit Logs** track "Who did What, When, and to Which Entity".
- Managed entirely by the dedicated `audit-service` via Kafka events.
- Stored persistently in a relational database for compliance and reporting.

## 4. Correlation IDs
- Every request entering the API Gateway is assigned a unique `X-Correlation-ID`.
- This ID must be attached to the Kafka message metadata payload.
- Every downstream service must include this Correlation ID in their application logs to trace a single request's lifecycle across multiple microservices.
