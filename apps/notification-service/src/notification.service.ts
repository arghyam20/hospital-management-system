import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {
  
  async handleAppointmentBooked(appointmentData: any) {
    const template = await prisma.template.findUnique({
      where: { name: 'APPOINTMENT_BOOKED' }
    });

    if (!template) {
      console.warn('Template APPOINTMENT_BOOKED not found!');
      return;
    }

    let content = template.body;
    content = content.replace('{{date}}', appointmentData.date);
    content = content.replace('{{startTime}}', appointmentData.startTime);

    // Create Notification Log
    await prisma.notification.create({
      data: {
        userId: appointmentData.patientId, // Patient ID
        type: template.type,
        subject: template.subject,
        content,
        status: 'SENT',
        sentAt: new Date(),
      }
    });

    console.log(`[Notification Service] Sent appointment confirmation to user: ${appointmentData.patientId}`);
  }

  async getPatientNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
