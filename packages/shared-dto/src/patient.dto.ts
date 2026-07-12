import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: '11111111-1111-1111-1111-111111111111' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty({ example: 'Male' })
  @IsString()
  @IsNotEmpty()
  gender!: string;

  @ApiProperty({ example: 'O+', required: false })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  contactNumber!: string;
}
