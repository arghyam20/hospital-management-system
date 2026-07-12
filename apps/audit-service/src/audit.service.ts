import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetAuditLogsDto } from '../../../../packages/shared-dto/src/audit.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuditService {
  
  async logEvent(action: string, entityType: string, entityId: string, details: any, userId?: string) {
    await prisma.auditLog.create({
      data: {
        action,
        entityType,
        entityId,
        userId,
        details: JSON.stringify(details),
      }
    });
    console.log(`[Audit Log] ${action} on ${entityType} ${entityId}`);
  }

  async getLogs(queryDto: GetAuditLogsDto) {
    const where: any = {};
    if (queryDto.entityId) where.entityId = queryDto.entityId;
    if (queryDto.entityType) where.entityType = queryDto.entityType;

    return prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit for performance
    });
  }
}
