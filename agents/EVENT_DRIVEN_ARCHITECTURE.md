# Event-Driven Architecture (EDA)

## Core Philosophy
The Hospital Management System relies on EDA to decouple services. Instead of Services directly invoking other Services via REST/gRPC (which creates tight temporal coupling and potential cascading failures), Services announce significant domain state changes as "Events".

## Event Types
- **Domain Events:** Past-tense statements of fact (e.g., `PatientCreated`, `AppointmentBooked`, `InvoicePaid`). These are the primary building blocks of the architecture.
- **Command Messages:** (Used selectively via Gateway) Imperative actions (e.g., `CreateInvoice`). Used for direct Request-Reply patterns over Kafka.

## The Event Choreography Pattern
Instead of a central orchestrator service dictating workflows, the HMS uses choreography.
- **Example Flow (Booking an Appointment):**
  1. `appointment-service` successfully books an appointment and saves to its DB.
  2. `appointment-service` publishes `appointment.booked`.
  3. `notification-service` consumes `appointment.booked` and emails the patient.
  4. `audit-service` consumes `appointment.booked` and logs the action.
  5. (Optional future) `billing-service` consumes `appointment.booked` to pre-generate a consultation invoice.

## Eventual Consistency
Because the database transaction (e.g., booking an appointment) and the event publish (Kafka emit) are separate network calls, there is a theoretical risk of dual-write failure.
- **Mitigation:** The system generally relies on reliable event emission with at-least-once delivery semantics. For highly critical financial flows, an Outbox Pattern can be implemented where events are first written to the local database transactionally before a relay worker publishes them to Kafka.
