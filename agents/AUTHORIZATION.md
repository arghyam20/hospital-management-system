# Authorization

## Overview
The HMS implements Role-Based Access Control (RBAC). Authorization checks are primarily enforced at the **API Gateway**, ensuring that unauthorized requests never consume compute resources on downstream microservices.

## Roles
The system defines standard hierarchical and compartmentalized roles:
- `ADMIN`: Global read/write access.
- `DOCTOR`: Access to patient records, prescribing, and ordering tests.
- `PHARMACIST`: Access to prescriptions and inventory management.
- `LAB_TECHNICIAN`: Access to test orders and uploading results.
- `PATIENT`: Access restricted to their *own* data.

## Guards and Policies
- **NestJS Guards:** The API Gateway uses a global `JwtAuthGuard` to parse and validate the JWT.
- **Role Guard:** A custom `RolesGuard` checks the `role` claim in the JWT against the required roles defined by the `@Roles()` decorator on specific route handlers.

## Data-Level Permissions (Attribute-Based Access Control - ABAC)
While RBAC secures the endpoint, data-level restrictions (ABAC) must be enforced by the downstream microservice.
- *Example:* A `PATIENT` role can access `/api/v1/patients/:id`. The API Gateway lets the request through. The `patient-service` must ensure that the `id` in the URL matches the `sub` (User ID) from the JWT payload.

## Future Extensions
- Policy-based authorization (e.g., using Casbin or OPA) for complex scenarios like "Doctor can only see records of Patients currently admitted under their care."
