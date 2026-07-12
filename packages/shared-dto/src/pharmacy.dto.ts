import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DispenseItemDto {
  @ApiProperty({ example: 'medicine-id-123' })
  @IsString()
  @IsNotEmpty()
  medicineId!: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;
}

export class DispensePrescriptionDto {
  @ApiProperty({ example: 'prescription-id-123' })
  @IsString()
  @IsNotEmpty()
  prescriptionId!: string;

  @ApiProperty({ example: 'pharmacist-id-123' })
  @IsString()
  @IsNotEmpty()
  pharmacistId!: string;

  @ApiProperty({ type: [DispenseItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DispenseItemDto)
  items!: DispenseItemDto[];
}
