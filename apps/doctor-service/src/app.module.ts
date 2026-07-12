import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'doctor-service', ['localhost:29092']),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class AppModule {}
