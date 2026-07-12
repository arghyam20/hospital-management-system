import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePatientDto } from '../../../../packages/shared-dto/src/patient.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';

const prisma = new PrismaClient();

@Injectable()
export class PatientService {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    const existingPatient = await prisma.patient.findUnique({
      where: { userId: createPatientDto.userId },
    });
    
    if (existingPatient) {
      throw new Error('Patient profile already exists for this user');
    }

    const patient = await prisma.patient.create({
      data: {
        userId: createPatientDto.userId,
        firstName: createPatientDto.firstName,
        lastName: createPatientDto.lastName,
        dateOfBirth: new Date(createPatientDto.dateOfBirth),
        gender: createPatientDto.gender,
        bloodGroup: createPatientDto.bloodGroup,
        contactNumber: createPatientDto.contactNumber,
      },
    });

    this.kafkaClient.emit(KafkaTopics.PATIENT_CREATED, JSON.stringify(patient));
    return patient;
  }

  async getPatientByUserId(userId: string) {
    const patient = await prisma.patient.findUnique({
      where: { userId },
      include: {
        emergencyContact: true,
        insurance: true,
        medicalHistory: true,
        address: true,
      },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }
}
