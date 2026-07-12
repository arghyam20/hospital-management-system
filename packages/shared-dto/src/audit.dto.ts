import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAuditLogsDto {
  @ApiProperty({ example: 'patient-id-123', required: false })
  @IsString()
  @IsOptional()
  entityId?: string;

  @ApiProperty({ example: 'Patient', required: false })
  @IsString()
  @IsOptional()
  entityType?: string;
}
