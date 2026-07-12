# User Flow

This outlines the step-by-step user journey through the Frontend Application.

## Patient Journey
1. **Login:** Patient enters credentials. Receives JWT.
2. **Dashboard:** Sees upcoming appointments, recent lab results, and unpaid bills.
3. **Book Appointment:**
   - Clicks "Book Appointment".
   - Selects Department/Specialty.
   - Selects Doctor.
   - Views available dates/slots.
   - Confirms booking.
4. **View Records:**
   - Navigates to "My Health".
   - Downloads PDF of latest Lab Report.
   - Views active prescriptions.
5. **Billing:**
   - Navigates to "Billing".
   - Sees a pending invoice.
   - Submits payment details (Mock integration).

## Doctor Journey
1. **Dashboard:** Views today's schedule and current patient queue.
2. **Consultation:**
   - Clicks on next Patient.
   - Views patient medical history.
   - Types clinical notes.
   - Uses auto-complete to add medicines to a new prescription.
   - Selects lab tests to order.
   - Marks visit as Complete.

## Pharmacist Journey
1. **Dashboard:** Views pending prescriptions and low-stock alerts.
2. **Dispensation:**
   - Scans/Enters Patient ID.
   - Views active prescriptions.
   - Confirms physical stock.
   - Clicks "Dispense", deducting digital inventory.
3. **Inventory Management:**
   - Updates stock levels when new shipments arrive.

## Admin Journey
1. **Dashboard:** Views hospital metrics (revenue, patient influx).
2. **User Management:** Registers new doctors and staff.
3. **Auditing:** Views the system-wide Audit Log to trace actions (e.g., who deleted a specific invoice).
