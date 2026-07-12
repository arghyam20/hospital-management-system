import { Controller } from '@nestjs/common';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';
import { AuditService } from './audit.service';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';
import { GetAuditLogsDto } from '../../../../packages/shared-dto/src/audit.dto';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @EventPattern(KafkaTopics.PATIENT_CREATED)
  async handlePatientCreated(@Payload() message: string) {
    const data = JSON.parse(message);
    await this.auditService.logEvent('CREATED', 'Patient', data.id, data, data.userId);
  }

  @EventPattern(KafkaTopics.DOCTOR_CREATED)
  async handleDoctorCreated(@Payload() message: string) {
    const data = JSON.parse(message);
    await this.auditService.logEvent('CREATED', 'Doctor', data.id, data, data.userId);
  }

  @EventPattern(KafkaTopics.APPOINTMENT_BOOKED)
  async handleAppointmentBooked(@Payload() message: string) {
    const data = JSON.parse(message);
    await this.auditService.logEvent('BOOKED', 'Appointment', data.id, data, data.patientId);
  }

  @EventPattern('billing.invoice_created')
  async handleInvoiceCreated(@Payload() message: string) {
    const data = JSON.parse(message);
    await this.auditService.logEvent('CREATED', 'Invoice', data.id, data, data.patientId);
  }

  @EventPattern('pharmacy.prescription_dispensed')
  async handlePrescriptionDispensed(@Payload() message: string) {
    const data = JSON.parse(message);
    await this.auditService.logEvent('DISPENSED', 'Prescription', data.prescriptionId, data, data.pharmacistId);
  }

  @MessagePattern('audit.getLogs')
  async getLogs(@Payload() data: GetAuditLogsDto) {
    return this.auditService.getLogs(data);
  }
}
