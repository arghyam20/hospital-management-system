# Cache Strategy

## Use Cases
Caching is used to reduce database load and improve read performance for data that mutates infrequently but is read often.

## Redis Implementation
- **Global Cache:** A centralized Redis instance (or cluster) is utilized.
- **NestJS Caching:** Use `@nestjs/cache-manager` integrated with the Redis store.

## Candidates for Caching
- **Doctor Profiles & Specialties:** Highly read, rarely changed. Cache TTL: 1 hour.
- **Medicine Catalog:** The static list of medicines and prices. Cache TTL: 12 hours.
- **JWT Denylist:** For immediately revoking compromised tokens before they expire.

## Cache Invalidation
- **Time-To-Live (TTL):** Standard expiration for low-risk data.
- **Event-Driven Invalidation:** When a service updates a cached entity (e.g., Doctor updates their profile), it emits an event. A cache-invalidation worker listens to this and clears the specific Redis key.

## Exclusions
- **Transactional Data:** Never cache active Appointment slots, real-time Inventory stock, or Patient Medical Records where stale data could cause clinical errors.
