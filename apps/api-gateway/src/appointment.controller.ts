import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookAppointmentDto } from '../../../../packages/shared-dto/src/appointment.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController implements OnModuleInit {
  constructor(
    @Inject('APPOINTMENT_SERVICE') private readonly appointmentClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.appointmentClient.subscribeToResponseOf('appointment.book');
    this.appointmentClient.subscribeToResponseOf('appointment.getByPatientId');
    this.appointmentClient.subscribeToResponseOf('appointment.getByDoctorId');
    await this.appointmentClient.connect();
  }

  @Post()
  @ApiOperation({ summary: 'Book an appointment' })
  @ApiResponse({ status: 201, description: 'Appointment booked' })
  async bookAppointment(@Body() bookDto: BookAppointmentDto) {
    return firstValueFrom(this.appointmentClient.send('appointment.book', bookDto));
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get appointments for a patient' })
  async getAppointmentsByPatient(@Param('patientId') patientId: string) {
    return firstValueFrom(this.appointmentClient.send('appointment.getByPatientId', { patientId }));
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get appointments for a doctor' })
  async getAppointmentsByDoctor(@Param('doctorId') doctorId: string) {
    return firstValueFrom(this.appointmentClient.send('appointment.getByDoctorId', { doctorId }));
  }
}
