import { Controller, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Notification')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController implements OnModuleInit {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.notificationClient.subscribeToResponseOf('notification.getByUserId');
    await this.notificationClient.connect();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications for a user' })
  async getNotificationsByUser(@Param('userId') userId: string) {
    return firstValueFrom(this.notificationClient.send('notification.getByUserId', { userId }));
  }
}
