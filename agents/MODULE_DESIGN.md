# Module Design

## General Module Structure
Every NestJS microservice is organized around domain-centric modules (following Domain-Driven Design). 

### Common Module Components
1. **Controller:** Handles incoming Kafka messages (`@MessagePattern`) or events (`@EventPattern`). Validates DTOs.
2. **Service:** Contains the core business logic. Interacts with the Prisma ORM.
3. **Module:** Wires controllers, services, and external dependencies (like the Kafka Client) together.

## Example: Billing Module (`billing-service`)

### Purpose
To manage all financial transactions, invoice generation, and payment tracking for hospital services.

### Responsibilities
- Aggregate charges from Appointments, Pharmacy, and Labs.
- Generate unified patient invoices.
- Record payments and calculate outstanding balances.

### Business Rules
- An invoice cannot be paid twice.
- If an invoice is partially paid, its status is `PARTIAL`.
- Taxes must be applied based on predefined tax entities before calculating the final total.

### Permissions
- `ADMIN`: Full access to create/void invoices.
- `PATIENT`: Can view their own invoices and make payments.

### Validation Rules
- `CreateInvoiceDto` must contain a valid `patientId` and at least one line item.
- Payment amounts cannot exceed the `totalAmount` of the invoice.

### Events
- **Consumed:** `appointment.completed`, `pharmacy.prescription_dispensed`
- **Published:** `billing.invoice_created`, `billing.payment_received`

### Future Extensions
- Integration with external payment gateways (Stripe, PayPal).
- Insurance claims processing module.
