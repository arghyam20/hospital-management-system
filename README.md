# Enterprise Hospital Management System (HMS)

An enterprise-grade, event-driven Hospital Management System built with **NestJS**, **Apache Kafka**, and **Prisma**. This system implements a strict Microservices Architecture following the Database-per-Service pattern.

## 🏛 Architecture

The system consists of 10 independent microservices communicating asynchronously via Kafka.
Detailed architectural documentation can be found in the [`agents/`](./agents) directory.

### Microservices
1. **API Gateway:** The single entry point for all external traffic. Handles authentication and routing.
2. **Auth Service:** Centralized Identity Provider (JWT issuance).
3. **Patient Service:** EHR and demographic management.
4. **Doctor Service:** Physician profiles and schedules.
5. **Appointment Service:** Booking, queuing, and visit management.
6. **Billing Service:** Invoice generation and payments.
7. **Pharmacy Service:** Medication inventory and prescriptions.
8. **Laboratory Service:** Test catalog and results processing.
9. **Notification Service:** Asynchronous email/SMS alerts.
10. **Audit Service:** Immutable ledger of system events.

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v20+)
- [pnpm](https://pnpm.io/) (v9+)
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Local Infrastructure
Start MySQL, Kafka, Zookeeper, and Redis using Docker Compose:
```bash
docker-compose up -d
```

### 3. Setup Databases
Run Prisma migrations and seed the databases for all microservices:
```bash
pnpm run db:setup
```
*(Alternatively, run `npx prisma migrate dev` and `npx prisma db seed` within each `apps/<service>` directory).*

### 4. Start the Application
Run all microservices and the API Gateway in development mode:
```bash
pnpm dev
```
The API Gateway will be available at `http://localhost:3000`.

## 🐳 Deployment (Kubernetes)

This repository is fully containerized and ready for Kubernetes deployment.

1. **Docker Images:** Pre-configured multi-stage `Dockerfile`s exist in each microservice directory.
2. **Kubernetes Manifests:** Base deployment and service manifests are located in the [`k8s/`](./k8s) directory.
3. **CI/CD:** GitHub Actions workflows are configured in `.github/workflows/ci.yml` for automated testing and image building.

### Deploying Locally (Minikube / Docker Desktop)
```bash
kubectl apply -f k8s/
```
Ensure you have configured a `hms-config` ConfigMap and `db-secrets` Secret in your cluster before deploying.

## 📖 Documentation
For a deep dive into the system design, coding standards, event flows, and API design, refer to the authoritative documentation generated in the `agents/` folder:
- [System Design](./agents/SYSTEM_DESIGN.md)
- [Database-per-Service Strategy](./agents/DATABASE_PER_SERVICE.md)
- [Event Flow](./agents/EVENT_FLOW.md)

## 🧪 Testing
Run unit and integration tests across the monorepo:
```bash
pnpm test
```

---
*Developed as a demonstration of highly scalable, decoupled enterprise architecture.*