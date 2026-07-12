import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'billing-service', ['localhost:29092']),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class AppModule {}
