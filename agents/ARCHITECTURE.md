# Architecture

## Overall Architecture
The HMS follows a strict **Microservices Architecture**. The system is divided into bounded contexts, each implemented as an independent NestJS microservice. These services are fronted by a unified API Gateway and communicate asynchronously via Apache Kafka to maintain loose coupling.

## API Gateway
The API Gateway acts as the single entry point for all external clients (Web/Mobile apps). 
- **Responsibilities:** Request routing, protocol translation (HTTP to Kafka RPC), global rate limiting, and centralized authentication validation (validating JWTs before proxying).
- **Pattern:** It uses a synchronous Request-Reply pattern over Kafka (`@MessagePattern`) to fetch data from downstream services and return HTTP responses to the client.

## Event-Driven Architecture (EDA)
To ensure high availability and scalability, the system relies heavily on EDA.
- State changes in one service (e.g., `PatientCreated`, `AppointmentBooked`) are published as domain events to Kafka topics.
- Other services listen to these topics (`@EventPattern`) and react accordingly (e.g., Audit service logging the event, Notification service sending an email), without the emitting service knowing about the consumers.

## Database Ownership
Following the **Database-per-Service** pattern, each microservice has its own isolated MySQL database. 
- No service is allowed to directly query another service's database.
- Data integration is achieved either by API Gateway composition (querying multiple services) or by eventual consistency (replicating necessary data via Kafka events).

## Shared Packages
To avoid code duplication while maintaining service independence, a `packages/` directory is used for shared libraries:
- `shared-dto`: Common Data Transfer Objects and validation rules.
- `shared-events`: Centralized Kafka topic names and event payload interfaces.
- `shared-kafka`: Reusable Kafka client configuration modules.

## Deployment Architecture
- **Containerization:** All services, including the frontend, API Gateway, and infrastructure (MySQL, Kafka, Zookeeper) are containerized using Docker.
- **Orchestration:** Intended for Kubernetes in production, utilizing Helm charts for managing microservice deployments, ConfigMaps for environment variables, and StatefulSets for databases/brokers.
