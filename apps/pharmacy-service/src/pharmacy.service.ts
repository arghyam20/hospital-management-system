import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DispensePrescriptionDto } from '../../../../packages/shared-dto/src/pharmacy.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';

const prisma = new PrismaClient();

@Injectable()
export class PharmacyService {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  async dispensePrescription(dispenseDto: DispensePrescriptionDto) {
    const prescription = await prisma.prescription.findUnique({
      where: { id: dispenseDto.prescriptionId },
      include: { items: true }
    });

    if (!prescription) throw new NotFoundException('Prescription not found');
    if (prescription.status === 'DISPENSED') throw new Error('Prescription is already dispensed');

    // Verify inventory and dispense
    const dispensation = await prisma.$transaction(async (tx) => {
      // Create dispensation record
      const disp = await tx.dispensation.create({
        data: {
          prescriptionId: dispenseDto.prescriptionId,
          pharmacistId: dispenseDto.pharmacistId,
          items: {
            create: dispenseDto.items.map(item => ({
              medicineId: item.medicineId,
              quantity: item.quantity,
            }))
          }
        }
      });

      // Update inventory and check stock
      for (const item of dispenseDto.items) {
        const inventory = await tx.inventory.findUnique({
          where: { medicineId: item.medicineId }
        });

        if (!inventory || inventory.quantity < item.quantity) {
          throw new Error(`Insufficient stock for medicine ID: ${item.medicineId}`);
        }

        await tx.inventory.update({
          where: { medicineId: item.medicineId },
          data: { quantity: inventory.quantity - item.quantity }
        });
      }

      // Mark prescription as dispensed
      await tx.prescription.update({
        where: { id: dispenseDto.prescriptionId },
        data: { status: 'DISPENSED' }
      });

      return disp;
    });

    this.kafkaClient.emit('pharmacy.prescription_dispensed', JSON.stringify(dispensation));
    return dispensation;
  }

  async getInventory() {
    return prisma.inventory.findMany({
      include: { medicine: true }
    });
  }
}
