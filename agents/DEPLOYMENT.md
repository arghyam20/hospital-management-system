# Deployment

## Environments
1. **Development:** Local machines using `docker-compose` to spin up MySQL, Kafka, and Redis.
2. **Staging:** A Kubernetes cluster mimicking production. Used for QA and Integration testing.
3. **Production:** Multi-node Kubernetes cluster.

## Containerization
- Every NestJS app and Next.js app has an optimized multi-stage `Dockerfile`.
- Base image: `node:20-alpine` (for security and minimal footprint).
- Only compiled `dist/` and `node_modules` (production only) are copied to the final image.

## Orchestration (Kubernetes)
- **Deployments:** Each microservice is deployed as a ReplicaSet.
- **Services:** Internal DNS routing.
- **Ingress:** NGINX Ingress Controller routing external traffic to the API Gateway.
- **StatefulSets:** Used for Kafka and Zookeeper (if not using managed services like Confluent Cloud).

## Scaling
- **Horizontal Pod Autoscaling (HPA):** Automatically scales pods based on CPU/Memory usage.
- The API Gateway and high-traffic services (Appointment, Billing) scale independently from background services (Audit).

## Rollback & Release
- **Strategy:** Rolling updates are used to ensure zero downtime.
- If a new pod fails its readiness probe, the deployment halts, and traffic continues routing to the old pods.
- **Disaster Recovery:** Databases must be geographically replicated or rely on daily automated backups.
