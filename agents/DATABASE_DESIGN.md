# Database Design

## Strategy: Database-per-Service
Each microservice is strictly bound to its own logical database. Foreign keys across microservices do not exist at the database level. Relationships are enforced logically via API Gateway composition or eventual consistency.

### 1. Auth Database (`auth_db`)
- **Tables:** `User`
- **Relationships:** None internal (Users map logically to Patients/Doctors via UUID).
- **Indexes:** `email` (Unique), `role`.

### 2. Patient Database (`patient_db`)
- **Tables:** `Patient`, `MedicalHistory`
- **Relationships:** Patient 1:N MedicalHistory.
- **Indexes:** `userId` (Unique, maps to Auth), `email` (Unique).

### 3. Doctor Database (`doctor_db`)
- **Tables:** `Doctor`
- **Relationships:** None.
- **Indexes:** `userId` (Unique, maps to Auth), `specialty`.

### 4. Appointment Database (`appointment_db`)
- **Tables:** `Appointment`, `Slot`, `Visit`, `Queue`
- **Relationships:** Appointment N:1 Slot, Appointment 1:1 Visit.
- **Indexes:** `patientId`, `doctorId`, `appointmentDate`.

### 5. Billing Database (`billing_db`)
- **Tables:** `Invoice`, `Payment`, `Tax`, `Discount`
- **Relationships:** Invoice 1:N Payment.
- **Indexes:** `patientId`, `status`.

### 6. Pharmacy Database (`pharmacy_db`)
- **Tables:** `Medicine`, `Inventory`, `Prescription`, `PrescriptionItem`, `Dispensation`, `DispensationItem`
- **Relationships:** Medicine 1:1 Inventory, Prescription 1:N PrescriptionItem, Dispensation 1:N DispensationItem.
- **Indexes:** `patientId`, `doctorId`, `Medicine.name` (Unique).

### 7. Laboratory Database (`laboratory_db`)
- **Tables:** `TestType`, `Test`, `Sample`, `Result`, `Report`
- **Relationships:** TestType 1:N Test, Test 1:N Sample, Test 1:1 Result, Test 1:N Report.
- **Indexes:** `patientId`, `doctorId`.

### 8. Notification Database (`notification_db`)
- **Tables:** `Notification`, `Template`
- **Relationships:** None.
- **Indexes:** `userId`, `status`.

### 9. Audit Database (`audit_db`)
- **Tables:** `AuditLog`
- **Relationships:** None.
- **Indexes:** `entityType`, `entityId`, `userId`, `createdAt`.

## Migration Strategy
- Migrations are strictly code-first and managed independently within each microservice's lifecycle.
- Schema changes must be backward compatible to ensure zero-downtime deployments.

## Backup Strategy
- Automated nightly snapshots of all databases.
- Point-in-Time Recovery (PITR) enabled for core transactional databases (`appointment_db`, `billing_db`, `pharmacy_db`).
