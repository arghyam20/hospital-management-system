import { Controller, Get, Query, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Audit')
@ApiBearerAuth()
@Controller('audit')
export class AuditController implements OnModuleInit {
  constructor(
    @Inject('AUDIT_SERVICE') private readonly auditClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.auditClient.subscribeToResponseOf('audit.getLogs');
    await this.auditClient.connect();
  }

  @Get()
  @ApiOperation({ summary: 'Get system audit logs' })
  @ApiQuery({ name: 'entityType', required: false, type: String })
  @ApiQuery({ name: 'entityId', required: false, type: String })
  async getAuditLogs(
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string
  ) {
    return firstValueFrom(this.auditClient.send('audit.getLogs', { entityType, entityId }));
  }
}
