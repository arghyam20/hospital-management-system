# Monitoring

## Health Checks
- Every NestJS microservice must implement the `@nestjs/terminus` module to expose a `/health` endpoint.
- **Checks:**
  - Prisma Database connectivity.
  - Kafka Broker connectivity.
  - Memory heap utilization.

## Metrics
- Expose a `/metrics` endpoint using Prometheus format (e.g., via `@willsoto/nestjs-prometheus`).
- **Key Metrics:**
  - HTTP Request Rate, Error Rate, and Duration (RED method).
  - Kafka consumer lag.
  - Active database connections.

## Tracing
- OpenTelemetry should be integrated to trace requests across the API Gateway and Kafka into downstream services.
- This allows visualization of the complete lifecycle of a request in tools like Jaeger or Zipkin.

## Alerts
- Prometheus Alertmanager handles alert routing based on thresholds.
- **Critical Alerts:**
  - API Gateway 5xx error rate > 1%.
  - Kafka consumer lag > 1000 messages.
  - Any database connection pool exhaustion.

## Performance Monitoring
- Application Performance Monitoring (APM) tools (e.g., Datadog, New Relic) should instrument the Node.js runtime to monitor event loop lag, garbage collection pauses, and slowest database queries.
