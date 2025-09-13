# Authentication

The RuPaul's Drag Race API uses JWT (JSON Web Tokens) for authentication. While `GET` requests are available without authentication, all `POST`, `PUT`, and `DELETE` operations require a valid JWT token.

## Getting Started

### 1. Register a User
```bash
curl -X POST https://api.rpdr.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "email": "your_email@example.com",
    "password": "your_password"
  }'
```

### 2. Login
```bash
curl -X POST https://api.rpdr.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your_email@example.com",
    "password": "your_password"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "your_username",
    "email": "your_email@example.com"
  }
}
```

## Using the Token

Include the JWT token in the `Authorization` header for protected endpoints:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -X POST https://api.rpdr.com/api/queen \
     -d '{
       "name": "New Queen",
       "govtname": "Legal Name",
       "birthdate": "1990-01-01"
     }'
```

## Headers Required

| Header | Value | Required |
|--------|-------|----------|
| `Content-Type` | `application/json` | Yes (for POST/PUT) |
| `Authorization` | `Bearer YOUR_JWT_TOKEN` | Yes (for protected endpoints) |

## Token Expiration

JWT tokens expire after 24 hours. You'll need to login again to get a new token when it expires.

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "error": "Invalid token."
}
```

## Security Best Practices

1. **Store tokens securely** - Don't expose them in client-side code
2. **Use HTTPS** - Always use HTTPS in production
3. **Rotate tokens** - Implement token refresh for long-lived sessions
4. **Validate on server** - Always validate tokens on the server side

## Rate Limiting

Authenticated users have higher rate limits:
- **Unauthenticated**: 100 requests per hour
- **Authenticated**: 1000 requests per hour
