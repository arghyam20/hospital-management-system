import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OrderTestDto, SubmitResultDto } from '../../../../packages/shared-dto/src/laboratory.dto';
import { ClientKafka } from '@nestjs/microservices';

const prisma = new PrismaClient();

@Injectable()
export class LaboratoryService {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  async orderTest(orderDto: OrderTestDto) {
    const test = await prisma.test.create({
      data: {
        patientId: orderDto.patientId,
        doctorId: orderDto.doctorId,
        testTypeId: orderDto.testTypeId,
        status: 'PENDING',
      },
      include: {
        testType: true
      }
    });

    this.kafkaClient.emit('laboratory.test_ordered', JSON.stringify(test));
    return test;
  }

  async submitResult(resultDto: SubmitResultDto) {
    const test = await prisma.test.findUnique({
      where: { id: resultDto.testId },
    });

    if (!test) throw new NotFoundException('Test not found');

    const result = await prisma.$transaction(async (tx) => {
      const res = await tx.result.create({
        data: {
          testId: resultDto.testId,
          findings: resultDto.findings,
          conclusion: resultDto.conclusion,
          analyzedBy: resultDto.analyzedBy,
        }
      });

      await tx.test.update({
        where: { id: resultDto.testId },
        data: { status: 'COMPLETED' }
      });

      return res;
    });

    this.kafkaClient.emit('laboratory.result_submitted', JSON.stringify(result));
    return result;
  }

  async getPatientTests(patientId: string) {
    return prisma.test.findMany({
      where: { patientId },
      include: {
        testType: true,
        results: true,
        samples: true,
      }
    });
  }
}
