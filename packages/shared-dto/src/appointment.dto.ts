import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookAppointmentDto {
  @ApiProperty({ example: 'patient-id-123' })
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @ApiProperty({ example: 'doctor-id-123' })
  @IsString()
  @IsNotEmpty()
  doctorId!: string;

  @ApiProperty({ example: '2026-08-01T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  @IsNotEmpty()
  endTime!: string;

  @ApiProperty({ example: 'CONSULTATION', required: false })
  @IsString()
  type?: string;
}
