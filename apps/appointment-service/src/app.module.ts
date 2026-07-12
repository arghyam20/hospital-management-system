import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'appointment-service', ['localhost:29092']),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppModule {}
