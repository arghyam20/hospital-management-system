# Contributing

## How to Contribute
1. Ensure there is an open issue discussing the proposed changes.
2. Fork the repository (if external) or create a branch (if internal).
3. Follow the `DEVELOPMENT_GUIDE.md` for local setup.
4. Write tests for your changes.
5. Ensure all CI checks (`pnpm run lint` and `pnpm run test`) pass locally.
6. Open a Pull Request against the `develop` branch.

## Code Review Process
- At least one approval from a Senior Engineer/Architect is required.
- Reviewers will check for:
  - Adherence to `CODING_STANDARDS.md`.
  - Proper error handling and lack of "swallowed" exceptions.
  - Correct isolation of boundaries (no cross-service DB queries).
