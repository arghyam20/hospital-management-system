import { Module } from '@nestjs/common';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'pharmacy-service', ['localhost:29092']),
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class AppModule {}
