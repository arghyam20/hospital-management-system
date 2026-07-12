# Authentication

## Overview
Authentication in the HMS is centralized via the `auth-service`, which acts as the sole issuer and validator of user identities. The system uses JSON Web Tokens (JWT) for stateless session management.

## Mechanism
1. **Login:** A user provides credentials (e.g., email/password) to the `/auth/login` endpoint on the API Gateway.
2. **Validation:** The Gateway forwards the request to the `auth-service` via Kafka.
3. **Token Issuance:** If valid, the `auth-service` generates a short-lived **Access Token (JWT)** and a long-lived **Refresh Token**.
4. **Token Storage:** 
   - Access tokens are typically stored in memory by frontend clients.
   - Refresh tokens are issued as HttpOnly, Secure, SameSite cookies to prevent XSS attacks.

## JWT Structure
- **Header:** `alg: HS256`, `typ: JWT`
- **Payload:** 
  - `sub`: User ID (UUID)
  - `email`: User's email
  - `role`: User's role (ADMIN, DOCTOR, PATIENT, etc.)
  - `exp`: Expiration timestamp (e.g., 15 minutes)
  - `iat`: Issued at timestamp

## Token Rotation and Expiry
- Access tokens expire quickly (e.g., 15-30 minutes) to minimize the window of opportunity if stolen.
- When an access token expires, the client calls `/auth/refresh` using the HttpOnly cookie. The server validates the refresh token against the database (to check for manual revocation) and issues a new access token.

## Password Reset and OTP
- **Forgot Password:** Generates a secure, time-limited cryptographic token emailed to the user as a link.
- **OTP:** (Future Extension) SMS-based OTP for Multi-Factor Authentication (MFA) for high-privilege roles (Doctors/Admins).
