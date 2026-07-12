# Project Overview

## Purpose
The Hospital Management System (HMS) is a comprehensive, enterprise-grade software solution designed to digitize, streamline, and integrate all core healthcare and administrative processes within a modern hospital environment.

## Scope
The system covers the entire patient lifecycle from registration and appointment booking to doctor consultation, laboratory testing, pharmacy dispensation, and final billing. It ensures strict data segregation, high availability, and real-time event propagation across specialized domains.

## Features
- **Identity & Access Management:** Centralized authentication and authorization with RBAC.
- **Patient Management:** Comprehensive electronic health records (EHR) and demographic data.
- **Doctor Management:** Physician profiles, specialties, and scheduling.
- **Appointment Management:** Real-time slot booking and queue management.
- **Billing & Invoicing:** Automated charge generation, tax calculations, and payment tracking.
- **Pharmacy Management:** Inventory tracking, low-stock alerts, and prescription dispensation.
- **Laboratory Management:** Test cataloging, sample tracking, and result publishing.
- **Notifications:** Multi-channel alerting (Email/SMS) for critical system events.
- **Auditing:** Centralized ledger of all administrative and clinical actions for compliance.

## User Roles
- **Patient:** Can view own medical history, book appointments, view bills and lab reports.
- **Doctor:** Can view assigned appointments, access patient EHR, prescribe medicine, and order lab tests.
- **Pharmacist:** Can view prescriptions, manage medicine inventory, and dispense medication.
- **Lab Technician/Pathologist:** Can view test orders, collect samples, and upload results/reports.
- **Admin/Receptionist:** Full access to manage users, override schedules, and view audit logs.

## Functional Requirements
- Patients must be able to book available slots for specific doctors.
- Doctors must be able to write digital prescriptions and order lab tests during a visit.
- The pharmacy must prevent dispensation if inventory is insufficient and automatically deduct stock.
- The billing system must automatically compile charges from appointments, pharmacy, and labs.
- All significant state changes (e.g., booking, billing, dispensing) must be securely audited.

## Non-Functional Requirements
- **High Availability:** Core clinical services must remain operational independent of peripheral services.
- **Data Integrity:** Strict ACID compliance within service boundaries; eventual consistency across domains.
- **Security:** End-to-end encryption, strict RBAC, and zero-trust internal network policies.
- **Compliance:** Full auditability of PII and PHI data access (HIPAA/GDPR alignment).

## Technology Stack
- **Backend Framework:** NestJS (Node.js/TypeScript)
- **Frontend Framework:** Next.js (React/TypeScript)
- **Database:** MySQL (Database-per-Service architecture)
- **Message Broker:** Apache Kafka
- **ORM:** Prisma
- **Package Manager:** pnpm (Monorepo via npm workspaces/Turborepo)

## Architecture Goals
- **Decoupling:** Services must not share databases or synchronous dependencies for core clinical flows.
- **Scalability:** Horizontal scaling of individual services based on load (e.g., scaling Billing separately from Patient).
- **Resilience:** If the Notification or Audit service goes down, the core Appointment service must still function (via async Kafka events).
