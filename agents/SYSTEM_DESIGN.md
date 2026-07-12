# System Design

## Core Principles
1. **Decentralized Data Management:** Each microservice completely owns its bounded context and underlying database.
2. **API Gateway Pattern:** External clients never talk directly to backend services. All requests flow through the Gateway, ensuring a single place for cross-cutting concerns (authentication, rate-limiting, SSL termination).
3. **Eventual Consistency via EDA:** Data consistency across service boundaries is achieved eventually through asynchronous Kafka events, ensuring high availability over strict consistency (following CAP theorem).
4. **Stateless Services:** All NestJS backend services are entirely stateless, allowing them to scale horizontally. State is maintained solely in the databases and Kafka.

## Component Interaction
1. **Synchronous Flow (Read/Write to single domain):** Client -> API Gateway -> (Kafka RPC) -> Target Service -> Database.
2. **Asynchronous Flow (Cross-domain side effects):** Service A -> Database A -> Service A publishes Event to Kafka -> Service B consumes Event -> Database B.

## Failure Handling & Resilience
- **Circuit Breakers:** API Gateway implements circuit breakers to prevent cascading failures if a backend service is overwhelmed.
- **Retries:** Kafka consumers implement automated retries with exponential backoff for transient failures.
- **Dead Letter Queues (DLQ):** Poison messages or persistently failing events are routed to a DLQ for manual intervention.

## Scaling Strategy
- **Compute:** Services are scaled horizontally in Kubernetes based on CPU/Memory metrics. `billing-service` and `appointment-service` are isolated so they can scale independently during peak hospital hours.
- **Database:** Read-replicas can be introduced per service if read latency degrades.
- **Message Broker:** Kafka topics are partitioned based on logical keys (e.g., `patientId`) to ensure ordering while allowing parallel consumption across consumer group instances.
