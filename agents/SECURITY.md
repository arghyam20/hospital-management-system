# Security

## 1. Authentication & Authorization
- All external endpoints must be protected by JWT validation, except explicitly whitelisted public routes (e.g., `/auth/login`).
- Passwords must be hashed using `bcrypt` with a minimum of 10 salt rounds.

## 2. Network Security
- **CORS:** Cross-Origin Resource Sharing must be strictly configured on the API Gateway to only allow requests from authorized frontend domains.
- **Helmet:** The API Gateway must use `helmet` to set secure HTTP headers (HSTS, NoSniff, XSS Protection).
- **Internal Traffic:** Microservices should not be exposed to the public internet. Only the API Gateway is exposed.

## 3. Rate Limiting
- The API Gateway must implement global rate limiting using `@nestjs/throttler` (e.g., 100 requests per minute per IP) to mitigate DDoS and brute-force attacks.
- Stricter limits applied to `/auth/login` and `/auth/register`.

## 4. Input Validation
- Prevent SQL/NoSQL Injection by strictly using Prisma ORM (which uses parameterized queries).
- Prevent XSS by validating and escaping user input at the Gateway level using `class-validator`.

## 5. Secrets Management
- No secrets (Database URIs, JWT Secrets, API Keys) should ever be hardcoded.
- In production, secrets are injected via Kubernetes Secrets or external vaults (HashiCorp Vault, AWS Secrets Manager) and loaded into Node via `process.env`.

## 6. Audit & Data Privacy
- All PHI (Protected Health Information) modifications are logged by the `audit-service`.
- Consider field-level encryption for highly sensitive fields (e.g., SSN, full medical history text) before writing to the database.
