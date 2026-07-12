# Kafka Design

## Core Concepts
Apache Kafka is the nervous system of the HMS. It handles both synchronous RPC (Request-Reply) and asynchronous Event Streaming (Pub/Sub).

## Topics Structure
Topics are named using a `domain.entity.action` or `domain.action` format.
- **Pattern:** `<service-name>.<event-name>`

### Standard Topics
- `auth.user_created`
- `patient.created`
- `appointment.booked`
- `appointment.cancelled`
- `billing.invoice_created`
- `billing.payment_received`
- `pharmacy.prescription_dispensed`
- `laboratory.result_submitted`

### RPC Topics (Request/Reply)
NestJS automatically manages `.reply` topics when using `@MessagePattern`.
- `patient.create` (reply: `patient.create.reply`)
- `billing.createInvoice` (reply: `billing.createInvoice.reply`)

## Consumers and Consumer Groups
- **Consumer Groups:** Each microservice has a distinct Consumer Group ID (e.g., `audit-service-consumer`, `notification-service-consumer`). This allows multiple instances of the same service to load-balance partitions, while ensuring different services receive a copy of every event.

## Ordering and Partitioning
- **Partition Keys:** Events related to a specific entity (like a `Patient`) must use the `patientId` as the Kafka partition key. This guarantees strict chronological ordering of events for that specific patient within a partition.

## Idempotency
- **At-Least-Once Delivery:** Kafka guarantees at-least-once delivery. Therefore, all consumers *must* be idempotent.
- **Implementation:** Consumers must check if an event (identified by a unique correlation ID or event ID) has already been processed before mutating their local database.

## Schema Evolution & Versioning
- **Versioning:** Event payloads should include a `version` field (e.g., `v1`). 
- **Evolution:** Breaking changes to an event schema require creating a new event name (e.g., `patient.created.v2`) to prevent crashing legacy consumers.
