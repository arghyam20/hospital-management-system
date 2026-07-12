# Microservices

## 1. API Gateway
- **Responsibilities:** Reverse proxy, rate limiting, global JWT validation, route aggregation.
- **Owned Database:** None.
- **Owned Entities:** None.
- **Dependencies:** All downstream services (Auth, Patient, Doctor, etc.) via Kafka Request-Reply.

## 2. Auth Service
- **Responsibilities:** User registration, login, JWT issuance, password management.
- **Owned Database:** `auth_db`
- **Owned Entities:** `User`, `Role`
- **Published Events:** `auth.user_created`, `auth.user_login`
- **Consumed Events:** None.
- **Dependencies:** None.

## 3. Patient Service
- **Responsibilities:** Managing patient demographics, medical history records, and emergency contacts.
- **Owned Database:** `patient_db`
- **Owned Entities:** `Patient`, `MedicalHistory`
- **Published Events:** `patient.created`, `patient.updated`
- **Consumed Events:** `auth.user_created` (to scaffold patient profile)
- **Dependencies:** None.

## 4. Doctor Service
- **Responsibilities:** Managing doctor profiles, specialties, and schedules.
- **Owned Database:** `doctor_db`
- **Owned Entities:** `Doctor`, `Specialty`
- **Published Events:** `doctor.created`
- **Consumed Events:** None.
- **Dependencies:** None.

## 5. Appointment Service
- **Responsibilities:** Booking appointments, managing queues, and logging physical visits.
- **Owned Database:** `appointment_db`
- **Owned Entities:** `Appointment`, `Slot`, `Visit`, `Queue`
- **Published Events:** `appointment.booked`, `appointment.cancelled`, `appointment.completed`
- **Consumed Events:** None.
- **Dependencies:** Implicit reliance on valid Patient/Doctor IDs.

## 6. Billing Service
- **Responsibilities:** Invoice generation, payment processing, tax and discount calculations.
- **Owned Database:** `billing_db`
- **Owned Entities:** `Invoice`, `Payment`, `Tax`, `Discount`
- **Published Events:** `billing.invoice_created`, `billing.payment_received`
- **Consumed Events:** `appointment.completed`, `pharmacy.prescription_dispensed`, `laboratory.test_completed` (to auto-generate line items).
- **Dependencies:** None.

## 7. Pharmacy Service
- **Responsibilities:** Medicine inventory management, prescription tracking, and drug dispensation.
- **Owned Database:** `pharmacy_db`
- **Owned Entities:** `Medicine`, `Inventory`, `Prescription`, `Dispensation`
- **Published Events:** `pharmacy.prescription_dispensed`, `pharmacy.low_stock`
- **Consumed Events:** None.
- **Dependencies:** None.

## 8. Laboratory Service
- **Responsibilities:** Managing lab test catalogs, tracking sample collections, and publishing findings.
- **Owned Database:** `laboratory_db`
- **Owned Entities:** `TestType`, `Test`, `Sample`, `Result`, `Report`
- **Published Events:** `laboratory.test_ordered`, `laboratory.test_completed`, `laboratory.result_submitted`
- **Consumed Events:** None.
- **Dependencies:** None.

## 9. Notification Service
- **Responsibilities:** Dispatching SMS, Email, and Push notifications based on system events.
- **Owned Database:** `notification_db`
- **Owned Entities:** `NotificationLog`, `Template`
- **Published Events:** `notification.sent`, `notification.failed`
- **Consumed Events:** `appointment.booked`, `billing.payment_received`, `laboratory.result_submitted` (and broadly any event requiring an alert).
- **Dependencies:** External SMTP/SMS providers (e.g., SendGrid, Twilio).

## 10. Audit Service
- **Responsibilities:** Immutable logging of all critical system actions for compliance and debugging.
- **Owned Database:** `audit_db`
- **Owned Entities:** `AuditLog`
- **Published Events:** None.
- **Consumed Events:** Listens to almost ALL system events (wildcard or explicit subscriptions).
- **Dependencies:** None.
