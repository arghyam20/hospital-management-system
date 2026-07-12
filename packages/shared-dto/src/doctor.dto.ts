import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: '22222222-2222-2222-2222-222222222222' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'Gregory' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'House' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: '+1987654321' })
  @IsString()
  @IsNotEmpty()
  contactNumber!: string;

  @ApiProperty({ example: 'dept-id-123' })
  @IsString()
  @IsNotEmpty()
  departmentId!: string;

  @ApiProperty({ example: 'spec-id-123' })
  @IsString()
  @IsNotEmpty()
  specializationId!: string;
}
