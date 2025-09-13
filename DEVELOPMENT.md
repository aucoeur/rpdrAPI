# Development Guide

## Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- Git
- PostgreSQL (for local development)

## Local Development Setup

### 1. Clone and Install
```bash
git clone https://github.com/aucoeur/rpdrAPI.git
cd rpdrAPI
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your local settings
# Required variables:
# - DATABASE_URL
# - JWT_SECRET
# - REDIS_URL (optional)
```

### 3. Database Setup
```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

### 4. Start Development Server
```bash
# Start all services
docker-compose up -d

# Or start just the API
npm run dev
```

## Project Structure
```
rpdr-api/
├── packages/
│   ├── api/                 # GraphQL + REST API
│   │   ├── src/
│   │   │   ├── schema/      # GraphQL schema definitions
│   │   │   ├── resolvers/   # GraphQL resolvers
│   │   │   ├── services/    # Business logic layer
│   │   │   ├── middleware/  # Auth, validation, rate limiting
│   │   │   ├── types/       # TypeScript type definitions
│   │   │   └── utils/       # Helper functions
│   │   ├── tests/           # Integration and unit tests
│   │   ├── prisma/          # Database schema and migrations
│   │   └── package.json
│   ├── data-pipeline/       # ETL and data scraping
│   └── shared/              # Shared utilities and types
├── docker-compose.yml       # Local development environment
└── README.md
```

## Available Scripts

### API Package
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

### Database
```bash
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database (drop and recreate)
npm run db:studio    # Open Prisma Studio
```

### Docker
```bash
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose logs -f api    # View API logs
```

## Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- --grep "Queen"

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## GraphQL Playground
Once the server is running, visit:
- GraphQL Playground: http://localhost:4000/graphql
- REST API: http://localhost:4000/api

## Debugging
- Use VS Code debugger with launch.json configuration
- Enable debug logging with `DEBUG=rpdr:*`
- Use Prisma Studio for database inspection

## Common Issues
- **Port conflicts**: Change ports in docker-compose.yml
- **Database connection**: Ensure PostgreSQL is running
- **Type errors**: Run `npm run type-check` for details
- **Test failures**: Check database is seeded properly
