# Database Per Service

## The Pattern
The HMS strictly adheres to the Database-per-Service microservice pattern. This means that:
1. Each service has its own database credentials.
2. A service cannot connect to another service's database directly.
3. Database technology can be polyglot (though currently standardized on MySQL for simplicity).

## Rationale
- **Isolation:** A bad query in the `billing-service` that locks tables will not bring down the `appointment-service`.
- **Scalability:** We can scale the `appointment_db` hardware independently of the `audit_db` hardware.
- **Autonomy:** Teams can alter the schema of their service without requiring cross-team coordination or risking breaking another service's queries.

## Handling Cross-Service Queries
Since JOINs across databases are impossible, we use two strategies:
1. **API Composition:** The API Gateway queries Service A, gets IDs, then queries Service B. (Useful for simple UI dashboards).
2. **CQRS / Data Replication:** If Service A frequently needs Service B's data, Service B publishes events. Service A listens and maintains a read-optimized copy of the necessary data in its own database.

## Distributed Transactions
ACID transactions across databases do not exist. We rely on the **Saga Pattern** (via Choreography) for distributed transactions. 
- Example: If a payment succeeds but the invoice update fails, a compensating event must be emitted to rollback the payment or flag for manual review.
