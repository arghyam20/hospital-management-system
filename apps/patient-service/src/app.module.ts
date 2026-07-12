import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'patient-service', ['localhost:29092']),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class AppModule {}
