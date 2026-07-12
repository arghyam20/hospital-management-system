# Final Checklist Before Production

- [ ] All `.env` configurations are correctly mapped to Kubernetes Secrets.
- [ ] Prisma migrations have been successfully applied to Production DBs.
- [ ] Kafka topics are created with appropriate partition counts and retention policies.
- [ ] API Gateway Rate Limiting and CORS are strictly configured.
- [ ] JWT Secrets are strong (256-bit randomly generated keys).
- [ ] CI/CD pipeline is fully green.
- [ ] Global Exception Filter is active (no stack traces leak).
- [ ] Application Performance Monitoring (APM) agents are active.
- [ ] Automated database backups are configured and tested.
