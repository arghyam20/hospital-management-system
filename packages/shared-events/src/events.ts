export enum KafkaTopics {
  // User
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',

  // Patient
  PATIENT_CREATED = 'patient.created',
  PATIENT_UPDATED = 'patient.updated',

  // Doctor
  DOCTOR_CREATED = 'doctor.created',
  DOCTOR_UPDATED = 'doctor.updated',

  // Appointment
  APPOINTMENT_BOOKED = 'appointment.booked',
  APPOINTMENT_COMPLETED = 'appointment.completed',
  APPOINTMENT_CANCELLED = 'appointment.cancelled',

  // Billing
  INVOICE_CREATED = 'invoice.created',
  PAYMENT_COMPLETED = 'payment.completed',

  // Pharmacy
  PRESCRIPTION_CREATED = 'prescription.created',
  MEDICINE_DISPENSED = 'medicine.dispensed',

  // Laboratory
  LAB_TEST_CREATED = 'lab.test.created',
  LAB_RESULT_READY = 'lab.result.ready',

  // Notification
  NOTIFICATION_EMAIL = 'notification.email',
  NOTIFICATION_SMS = 'notification.sms',

  // Audit
  AUDIT_LOG = 'audit.log',
}
