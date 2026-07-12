import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BookAppointmentDto } from '../../../../packages/shared-dto/src/appointment.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';

const prisma = new PrismaClient();

@Injectable()
export class AppointmentService {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  async bookAppointment(bookDto: BookAppointmentDto) {
    // Basic verification - checking slot availability
    const slot = await prisma.slot.findFirst({
      where: {
        doctorId: bookDto.doctorId,
        date: new Date(bookDto.date),
        startTime: bookDto.startTime,
        isAvailable: true,
      }
    });

    if (!slot) {
      throw new Error('Slot is not available for this time');
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: bookDto.patientId,
        doctorId: bookDto.doctorId,
        date: new Date(bookDto.date),
        startTime: bookDto.startTime,
        endTime: bookDto.endTime,
        type: bookDto.type || 'CONSULTATION',
        bookings: {
          create: {
            source: 'ONLINE',
            status: 'CONFIRMED'
          }
        }
      },
    });

    // Mark slot as unavailable
    await prisma.slot.update({
      where: { id: slot.id },
      data: { isAvailable: false }
    });

    this.kafkaClient.emit(KafkaTopics.APPOINTMENT_BOOKED, JSON.stringify(appointment));
    return appointment;
  }

  async getPatientAppointments(patientId: string) {
    return prisma.appointment.findMany({
      where: { patientId },
      include: {
        bookings: true,
      }
    });
  }

  async getDoctorAppointments(doctorId: string) {
    return prisma.appointment.findMany({
      where: { doctorId },
      include: {
        bookings: true,
        visits: true,
      }
    });
  }
}
