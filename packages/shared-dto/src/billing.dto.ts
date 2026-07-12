import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({ example: 'patient-id-123' })
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @ApiProperty({ example: 'appointment-id-123', required: false })
  @IsString()
  @IsOptional()
  appointmentId?: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ example: '2026-08-01T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  dueDate!: string;
}

export class MakePaymentDto {
  @ApiProperty({ example: 'invoice-id-123' })
  @IsString()
  @IsNotEmpty()
  invoiceId!: string;

  @ApiProperty({ example: 1080 })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ example: 'CREDIT_CARD' })
  @IsString()
  @IsNotEmpty()
  paymentMethod!: string;
}
