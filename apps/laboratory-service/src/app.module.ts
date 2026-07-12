import { Module } from '@nestjs/common';
import { LaboratoryController } from './laboratory.controller';
import { LaboratoryService } from './laboratory.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'laboratory-service', ['localhost:29092']),
  ],
  controllers: [LaboratoryController],
  providers: [LaboratoryService],
})
export class AppModule {}
