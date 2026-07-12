import { Controller } from '@nestjs/common';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { KafkaTopics } from '../../../../packages/shared-events/src/events';
import { GetUserNotificationsDto } from '../../../../packages/shared-dto/src/notification.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(KafkaTopics.APPOINTMENT_BOOKED)
  async handleAppointmentBooked(@Payload() message: string) {
    try {
      const data = JSON.parse(message);
      await this.notificationService.handleAppointmentBooked(data);
    } catch (e) {
      console.error('Error handling APPOINTMENT_BOOKED event', e);
    }
  }

  @MessagePattern('notification.getByUserId')
  async getNotifications(@Payload() data: GetUserNotificationsDto) {
    return this.notificationService.getPatientNotifications(data.userId);
  }
}
