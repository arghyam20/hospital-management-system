import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserNotificationsDto {
  @ApiProperty({ example: 'user-id-123' })
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
