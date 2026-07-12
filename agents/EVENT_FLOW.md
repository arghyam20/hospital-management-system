# Event Flow

Detailed mapping of system events, their producers, and consumers.

## 1. Auth & Identity
- **`auth.user_created`**
  - **Producer:** `auth-service`
  - **Consumer:** `patient-service` (creates empty patient profile), `audit-service` (logs creation).
- **`auth.user_login`**
  - **Producer:** `auth-service`
  - **Consumer:** `audit-service` (logs access).

## 2. Appointment Flow
- **`appointment.booked`**
  - **Producer:** `appointment-service`
  - **Consumer:** `notification-service` (sends confirmation email), `audit-service`.
- **`appointment.cancelled`**
  - **Producer:** `appointment-service`
  - **Consumer:** `notification-service` (sends cancellation email), `audit-service`.
- **`appointment.completed`**
  - **Producer:** `appointment-service` (triggered when Doctor ends visit)
  - **Consumer:** `billing-service` (drafts a consultation invoice), `audit-service`.

## 3. Clinical & Ancillary
- **`laboratory.test_ordered`**
  - **Producer:** `laboratory-service`
  - **Consumer:** `notification-service` (alerts patient of new order), `audit-service`.
- **`laboratory.result_submitted`**
  - **Producer:** `laboratory-service`
  - **Consumer:** `notification-service` (alerts patient and doctor), `billing-service` (drafts lab invoice), `audit-service`.
- **`pharmacy.prescription_dispensed`**
  - **Producer:** `pharmacy-service`
  - **Consumer:** `billing-service` (drafts pharmacy invoice), `audit-service`.

## 4. Financial
- **`billing.invoice_created`**
  - **Producer:** `billing-service`
  - **Consumer:** `notification-service` (emails invoice to patient), `audit-service`.
- **`billing.payment_received`**
  - **Producer:** `billing-service`
  - **Consumer:** `notification-service` (sends receipt), `audit-service`.
