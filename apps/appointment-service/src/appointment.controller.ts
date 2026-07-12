import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentService } from './appointment.service';
import { BookAppointmentDto } from '../../../../packages/shared-dto/src/appointment.dto';

@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @MessagePattern('appointment.book')
  async bookAppointment(@Payload() bookDto: BookAppointmentDto) {
    return this.appointmentService.bookAppointment(bookDto);
  }

  @MessagePattern('appointment.getByPatientId')
  async getByPatientId(@Payload() data: { patientId: string }) {
    return this.appointmentService.getPatientAppointments(data.patientId);
  }

  @MessagePattern('appointment.getByDoctorId')
  async getByDoctorId(@Payload() data: { doctorId: string }) {
    return this.appointmentService.getDoctorAppointments(data.doctorId);
  }
}
