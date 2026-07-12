import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { SharedKafkaModule } from '../../../../packages/shared-kafka/src/kafka.module';

@Module({
  imports: [
    SharedKafkaModule.register('KAFKA_CLIENT', 'audit-service', ['localhost:29092']),
  ],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AppModule {}
