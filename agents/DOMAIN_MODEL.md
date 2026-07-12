# Domain Model

The Domain Model represents the logical entities of the hospital business. Note that physically, these entities are distributed across different microservice databases.

## Identity Domain (Auth Service)
- **User:** Represents a human interacting with the system. Has credentials and a Role.

## Clinical Domain
- **Patient (Patient Service):** Core demographic data, emergency contacts.
- **MedicalHistory (Patient Service):** Chronological records of a patient's health.
- **Doctor (Doctor Service):** Physician details, specialization, qualifications.
- **Specialty (Doctor Service):** Categorization of medical focus (e.g., Cardiology, Pediatrics).

## Operations Domain
- **Appointment (Appointment Service):** A scheduled time for a Patient to see a Doctor.
- **Slot (Appointment Service):** A block of time a Doctor is available.
- **Visit (Appointment Service):** The actual execution of an appointment.
- **Queue (Appointment Service):** Daily ordered list of patients waiting.

## Ancillary Domain
- **Medicine (Pharmacy Service):** Master drug catalog.
- **Inventory (Pharmacy Service):** Stock levels for medicines.
- **Prescription (Pharmacy Service):** A doctor's order for medication.
- **TestType (Laboratory Service):** Master catalog of available lab tests.
- **Sample (Laboratory Service):** Physical specimen collected for a test.
- **Result (Laboratory Service):** Data output from an analyzed sample.

## Financial Domain
- **Invoice (Billing Service):** A bill to a patient for services rendered.
- **Payment (Billing Service):** A transaction fulfilling an invoice.

## Cross-Cutting Domain
- **AuditLog (Audit Service):** Immutable record of a state change.
- **Notification (Notification Service):** A dispatched alert to a user.
