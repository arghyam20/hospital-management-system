# Environment

## Purpose
Managing distinct execution contexts across the software development lifecycle.

## Environments
1. **Local:** `NODE_ENV=development`. Runs on developer machines using `pnpm start:dev` and local Docker containers.
2. **Test:** `NODE_ENV=test`. Used for running automated pipelines. Usually uses in-memory DBs or ephemeral Testcontainers.
3. **Staging:** `NODE_ENV=staging`. Identical architecture to Production, used for User Acceptance Testing (UAT).
4. **Production:** `NODE_ENV=production`. Live system for actual hospital use.

## Environment Variables
- Handled exclusively via `.env` files and Docker environment injection.
- **NEVER** commit `.env` files to source control (ensure they are in `.gitignore`).
- Use `.env.example` to document required variables without exposing real secrets.
