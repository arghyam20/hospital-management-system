# API Design

## REST Conventions
All external-facing endpoints exposed by the API Gateway strictly follow RESTful conventions.
- Use nouns, not verbs: `/patients`, `/appointments`, `/billing/invoices`
- Pluralize resources: `/patients/:id` (not `/patient/:id`)
- HTTP Methods dictating actions:
  - `GET`: Read resources
  - `POST`: Create resources
  - `PUT`/`PATCH`: Update resources
  - `DELETE`: Remove resources

## Naming Standards
- URL paths must be `kebab-case`.
- JSON request and response body keys must be `camelCase`.

## Versioning
- API versioning is managed via URL paths at the gateway level.
- Format: `/api/v1/...`

## Response Format
Standardized JSON response envelope is NOT strictly required, but consistent HTTP status codes are mandatory:
- `200 OK`: Successful read/update.
- `201 Created`: Successful creation.
- `204 No Content`: Successful deletion.

## Error Format
All errors returned by the API Gateway must follow a standardized structure (usually handled by NestJS global exception filters):
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password is too short"],
  "error": "Bad Request",
  "timestamp": "2026-07-12T10:00:00Z"
}
```

## Pagination, Filtering, and Sorting
- **Pagination:** Use `page` and `limit` query parameters. (e.g., `?page=1&limit=20`)
- **Sorting:** Use `sort` query parameter (e.g., `?sort=-createdAt` for descending).
- **Filtering:** Use exact match query parameters (e.g., `?status=PENDING`).

## Authentication & Authorization
- **Authentication:** Handled globally via HTTP `Bearer` tokens in the `Authorization` header.
- **Authorization:** Enforced at the route level using Role-Based Access Control (RBAC) metadata (e.g., `@Roles('ADMIN', 'DOCTOR')`).
