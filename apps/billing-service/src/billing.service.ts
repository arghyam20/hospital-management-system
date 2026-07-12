import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateInvoiceDto, MakePaymentDto } from '../../../../packages/shared-dto/src/billing.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';

const prisma = new PrismaClient();

@Injectable()
export class BillingService {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  async createInvoice(createDto: CreateInvoiceDto) {
    // In a real app, calculate tax from Tax table based on applicable rates
    const taxRate = 0.18; // 18% mock
    const taxAmount = createDto.amount * taxRate;
    const totalAmount = createDto.amount + taxAmount;

    const invoice = await prisma.invoice.create({
      data: {
        patientId: createDto.patientId,
        appointmentId: createDto.appointmentId,
        amount: createDto.amount,
        taxAmount,
        totalAmount,
        dueDate: new Date(createDto.dueDate),
      },
    });

    this.kafkaClient.emit('billing.invoice_created', JSON.stringify(invoice));
    return invoice;
  }

  async makePayment(paymentDto: MakePaymentDto) {
    const invoice = await prisma.invoice.findUnique({
      where: { id: paymentDto.invoiceId },
    });

    if (!invoice) throw new NotFoundException('Invoice not found');
    if (invoice.status === 'PAID') throw new Error('Invoice is already paid');

    const payment = await prisma.payment.create({
      data: {
        invoiceId: paymentDto.invoiceId,
        amount: paymentDto.amount,
        paymentMethod: paymentDto.paymentMethod,
        status: 'COMPLETED',
      }
    });

    // Check if fully paid
    const allPayments = await prisma.payment.findMany({
      where: { invoiceId: paymentDto.invoiceId, status: 'COMPLETED' },
    });
    
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);
    
    if (totalPaid >= invoice.totalAmount) {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: 'PAID' }
      });
      this.kafkaClient.emit('billing.invoice_paid', JSON.stringify({ invoiceId: invoice.id }));
    } else {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: 'PARTIAL' }
      });
    }

    return payment;
  }

  async getPatientInvoices(patientId: string) {
    return prisma.invoice.findMany({
      where: { patientId },
      include: {
        payments: true,
      }
    });
  }
}
