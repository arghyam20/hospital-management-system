import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderTestDto {
  @ApiProperty({ example: 'patient-id-123' })
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @ApiProperty({ example: 'doctor-id-123' })
  @IsString()
  @IsNotEmpty()
  doctorId!: string;

  @ApiProperty({ example: 'testtype-id-123' })
  @IsString()
  @IsNotEmpty()
  testTypeId!: string;
}

export class SubmitResultDto {
  @ApiProperty({ example: 'test-id-123' })
  @IsString()
  @IsNotEmpty()
  testId!: string;

  @ApiProperty({ example: '{"WBC": 8500, "RBC": 4.5}' })
  @IsString()
  @IsNotEmpty()
  findings!: string;

  @ApiProperty({ example: 'Normal values' })
  @IsString()
  @IsNotEmpty()
  conclusion!: string;

  @ApiProperty({ example: 'pathologist-id-123' })
  @IsString()
  @IsNotEmpty()
  analyzedBy!: string;
}
