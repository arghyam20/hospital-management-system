import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { CreateInvoiceDto, MakePaymentDto } from '../../../../packages/shared-dto/src/billing.dto';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @MessagePattern('billing.createInvoice')
  async createInvoice(@Payload() createDto: CreateInvoiceDto) {
    return this.billingService.createInvoice(createDto);
  }

  @MessagePattern('billing.makePayment')
  async makePayment(@Payload() paymentDto: MakePaymentDto) {
    return this.billingService.makePayment(paymentDto);
  }

  @MessagePattern('billing.getByPatientId')
  async getByPatientId(@Payload() data: { patientId: string }) {
    return this.billingService.getPatientInvoices(data.patientId);
  }
}
