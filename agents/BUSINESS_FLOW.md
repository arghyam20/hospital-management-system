# Business Flow

This document describes the high-level business logic interactions across domains.

## 1. Onboarding Flow
1. Admin creates a User account (`auth-service`).
2. Depending on role, Admin creates a corresponding profile (`patient-service` or `doctor-service`).
3. (Future) `auth-service` emits `user.created`, triggering profile scaffold automatically.

## 2. Core Outpatient Flow (OPD)
1. **Booking:** Patient searches for Doctor availability and books an Appointment (`appointment-service`).
2. **Consultation:** Doctor views Appointment, conducts visit, and records notes (`appointment-service`).
3. **Prescribing:** Doctor creates a Prescription (`pharmacy-service`).
4. **Lab Ordering:** Doctor orders a Blood Test (`laboratory-service`).
5. **Dispensing:** Patient goes to Pharmacy. Pharmacist dispenses medicine; inventory is reduced (`pharmacy-service`).
6. **Sampling:** Patient goes to Lab. Technician collects sample. Pathologist uploads result (`laboratory-service`).
7. **Billing:** Patient proceeds to checkout. Receptionist generates Invoice combining Consultation Fee, Medicine Cost, and Lab Fee (`billing-service`).

## 3. Asynchronous Business Rules
- **Low Stock:** If a dispensation drops inventory below a threshold, `pharmacy-service` emits `pharmacy.low_stock`. The system (Admin) is alerted.
- **Critical Results:** If a lab result is flagged as abnormal, an immediate notification is sent to the Doctor.
- **No-Show:** If an appointment time passes without a Visit record, a cron job marks it as `NO_SHOW` and potentially applies a penalty fee via `billing-service`.
