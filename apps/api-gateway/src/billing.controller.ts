import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateInvoiceDto, MakePaymentDto } from '../../../../packages/shared-dto/src/billing.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Billing')
@ApiBearerAuth()
@Controller('billing')
export class BillingController implements OnModuleInit {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.billingClient.subscribeToResponseOf('billing.createInvoice');
    this.billingClient.subscribeToResponseOf('billing.makePayment');
    this.billingClient.subscribeToResponseOf('billing.getByPatientId');
    await this.billingClient.connect();
  }

  @Post('invoice')
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiResponse({ status: 201, description: 'Invoice created' })
  async createInvoice(@Body() createDto: CreateInvoiceDto) {
    return firstValueFrom(this.billingClient.send('billing.createInvoice', createDto));
  }

  @Post('payment')
  @ApiOperation({ summary: 'Make a payment for an invoice' })
  @ApiResponse({ status: 201, description: 'Payment recorded' })
  async makePayment(@Body() paymentDto: MakePaymentDto) {
    return firstValueFrom(this.billingClient.send('billing.makePayment', paymentDto));
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get invoices for a patient' })
  async getInvoicesByPatient(@Param('patientId') patientId: string) {
    return firstValueFrom(this.billingClient.send('billing.getByPatientId', { patientId }));
  }
}
