# CI/CD (Continuous Integration / Continuous Deployment)

## Continuous Integration (CI)
- **Platform:** GitHub Actions or GitLab CI.
- **Triggers:** Push to `main` or Pull Requests.
- **Pipeline Steps:**
  1. **Linting:** `pnpm lint` (ESLint & Prettier).
  2. **Type Checking:** `pnpm tsc --noEmit`.
  3. **Unit Tests:** `pnpm test`.
  4. **Security Scan:** Check for vulnerable dependencies (`pnpm audit`).

## Continuous Deployment (CD)
- **Docker Build:** On merge to `main`, Docker images are built and pushed to a Container Registry (e.g., ECR/GCR).
- **Versioning:** Images are tagged with the Git SHA.
- **Deployment:** GitOps (e.g., ArgoCD) syncs the Kubernetes cluster with the latest Helm charts pointing to the new Docker tags.
