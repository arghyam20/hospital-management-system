import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDoctorDto } from '../../../../packages/shared-dto/src/doctor.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';

const prisma = new PrismaClient();

@Injectable()
export class DoctorService {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  async createDoctor(createDoctorDto: CreateDoctorDto) {
    const existingDoctor = await prisma.doctor.findUnique({
      where: { userId: createDoctorDto.userId },
    });
    
    if (existingDoctor) {
      throw new Error('Doctor profile already exists for this user');
    }

    const doctor = await prisma.doctor.create({
      data: {
        userId: createDoctorDto.userId,
        firstName: createDoctorDto.firstName,
        lastName: createDoctorDto.lastName,
        contactNumber: createDoctorDto.contactNumber,
        departmentId: createDoctorDto.departmentId,
        specializationId: createDoctorDto.specializationId,
      },
    });

    this.kafkaClient.emit(KafkaTopics.DOCTOR_CREATED, JSON.stringify(doctor));
    return doctor;
  }

  async getDoctorByUserId(userId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
      include: {
        department: true,
        specialization: true,
        schedules: true,
        availabilities: true,
        leaves: true,
      },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async getAllDoctors() {
    return prisma.doctor.findMany({
      include: {
        department: true,
        specialization: true,
      },
    });
  }
}
