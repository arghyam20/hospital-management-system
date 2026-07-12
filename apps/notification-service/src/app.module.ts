import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'notification-service', ['localhost:29092']),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}
