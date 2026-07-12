import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { PatientController } from './patient.controller';
import { DoctorController } from './doctor.controller';
import { AppointmentController } from './appointment.controller';
import { BillingController } from './billing.controller';
import { PharmacyController } from './pharmacy.controller';
import { LaboratoryController } from './laboratory.controller';
import { NotificationController } from './notification.controller';
import { AuditController } from './audit.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-consumer',
          },
        },
      },
      {
        name: 'PATIENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-patient',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-patient-consumer',
          },
        },
      },
      {
        name: 'DOCTOR_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-doctor',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-doctor-consumer',
          },
        },
      },
      {
        name: 'APPOINTMENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-appointment',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-appointment-consumer',
          },
        },
      },
      {
        name: 'BILLING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-billing',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-billing-consumer',
          },
        },
      },
      {
        name: 'PHARMACY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-pharmacy',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-pharmacy-consumer',
          },
        },
      },
      {
        name: 'LABORATORY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-laboratory',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-laboratory-consumer',
          },
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-notification',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-notification-consumer',
          },
        },
      },
      {
        name: 'AUDIT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-audit',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api-gateway-audit-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, PatientController, DoctorController, AppointmentController, BillingController, PharmacyController, LaboratoryController, NotificationController, AuditController],
  providers: [AppService],
})
export class AppModule {}
