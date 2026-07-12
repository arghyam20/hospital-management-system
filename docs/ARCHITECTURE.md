# Architecture Documentation

## Overview
The Hospital Management System is built using a Microservices Architecture to ensure high scalability, reliability, and maintainability.

## Services
1. **API Gateway**: Entry point for all clients. Handles authentication, rate limiting, and request routing.
2. **Auth Service**: Manages users, roles, permissions, and JWT tokens.
3. **Patient Service**: Manages patient profiles, medical history, and emergency contacts.
4. **Doctor Service**: Manages doctor profiles, schedules, and leaves.
5. **Appointment Service**: Handles booking, slots, queues, and status management.
6. **Billing Service**: Manages invoices, payments, and discounts.
7. **Pharmacy Service**: Handles inventory, prescriptions, and supplier management.
8. **Laboratory Service**: Manages lab tests, samples, and results.
9. **Notification Service**: Sends Emails, SMS, and Push Notifications.
10. **Audit Service**: Centralized API and Activity logging.

## Communication
- **Synchronous**: API Gateway to Microservices (HTTP/REST or gRPC).
- **Asynchronous**: Microservice to Microservice via Apache Kafka (Event-Driven Architecture).

## Technology Stack
- **Backend**: NestJS, TypeScript, Prisma
- **Frontend**: Next.js, TailwindCSS, Zustand
- **Databases**: MySQL (One database per microservice)
- **Message Broker**: Apache Kafka
- **Cache**: Redis

## Kafka Topics
- `user.created`, `user.updated`
- `patient.created`, `patient.updated`
- `doctor.created`, `doctor.updated`
- `appointment.booked`, `appointment.completed`, `appointment.cancelled`
- `invoice.created`, `payment.completed`
- `prescription.created`, `medicine.dispensed`
- `lab.test.created`, `lab.result.ready`
- `notification.email`, `notification.sms`
- `audit.log`
