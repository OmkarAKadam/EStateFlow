# Authentication Design (MVP)

Authentication in the EstateFlow application will be implemented using **JWT (JSON Web Tokens)**.

## Authentication Flow

1. Client sends login request with credentials.
2. Request is sent to the backend endpoint:

   POST /api/auth/login

3. Backend verifies the user's password using **BCrypt**.
4. If the credentials are valid, the backend generates a **JWT token**.
5. The token is returned to the client.
6. The client includes this token in future requests to access protected endpoints.

## Authorization Header Format

All authenticated requests must include the JWT token in the request header:

## Token Payload

The JWT token will contain the following information:

- **Subject (sub)** → User email
- **Issued At (iat)** → Token creation time
- **Expiration (exp)** → Token expiry time (24 hours)

## Purpose

Using JWT allows the backend to implement **stateless authentication**, meaning the server does not need to store session information. Each request can be verified using the token itself.