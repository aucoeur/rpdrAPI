# Development Setup Guide

## Prerequisites

- **Node.js 18+** and **npm 9+**
- **PostgreSQL 15+** (for database)
- **Redis** (for caching, optional for development)

## Quick Start (Without Docker)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up PostgreSQL Database

#### Option A: Local PostgreSQL Installation
```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Create database and user
createdb rpdr_api
psql rpdr_api -c "CREATE USER rpdr_user WITH PASSWORD 'rpdr_password';"
psql rpdr_api -c "GRANT ALL PRIVILEGES ON DATABASE rpdr_api TO rpdr_user;"
```

#### Option B: Use Docker for Database Only
```bash
# Start only PostgreSQL and Redis
docker-compose up -d postgres redis
```

### 3. Set up Environment Variables
```bash
# Copy environment template
cp env.example .env

# Edit .env with your database configuration
# DATABASE_URL="postgresql://rpdr_user:rpdr_password@localhost:5432/rpdr_api"
```

### 4. Run Database Migrations
```bash
cd packages/api
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Start Development Servers
```bash
# Start API server
npm run api:dev

# In another terminal, start data pipeline
npm run pipeline:dev

# In another terminal, start documentation
npm run docs:dev
```

## With Docker (Recommended)

### 1. Start Full Development Environment
```bash
docker-compose up
```

This will start:
- PostgreSQL database (port 5432)
- Redis cache (port 6379)
- API server (port 4000)
- Data pipeline service

### 2. Access Services
- **GraphQL Playground**: http://localhost:4000
- **API Documentation**: http://localhost:3001
- **Database Studio**: `cd packages/api && npx prisma studio`

## Development Commands

### Database Operations
```bash
cd packages/api

# Create and run migrations
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio

# Generate Prisma client
npx prisma generate
```

### API Development
```bash
# Start API in development mode
npm run api:dev

# Build API
npm run api:build

# Run tests
npm run test

# Type check
npm run type-check
```

### Data Pipeline
```bash
# Start data pipeline
npm run pipeline:dev

# Run data pipeline once
npm run pipeline:start
```

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env file
3. Verify database and user exist
4. Check firewall/port settings

### Prisma Issues
1. Run `npx prisma generate` after schema changes
2. Check Prisma schema syntax
3. Ensure database is accessible

### Docker Issues
1. Ensure Docker Desktop is running
2. Check if ports 5432, 6379, 4000 are available
3. Try `docker-compose down && docker-compose up`

### Node.js Issues
1. Ensure Node.js 18+ is installed
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check npm version: `npm --version`

## Project Structure

```
rpdr-api/
├── packages/
│   ├── api/                 # GraphQL + REST API
│   │   ├── src/
│   │   │   ├── schema/      # GraphQL schema
│   │   │   ├── resolvers/   # GraphQL resolvers
│   │   │   ├── services/    # Business logic
│   │   │   └── lib/         # Database connection
│   │   └── prisma/          # Database schema & migrations
│   ├── data-pipeline/       # ETL and scraping
│   └── shared/              # Shared utilities
├── docs/                    # Documentation
├── docker-compose.yml       # Development environment
└── scripts/                 # Setup scripts
```

## Next Steps

1. **Set up your database** (PostgreSQL)
2. **Run migrations** to create tables
3. **Seed the database** with sample data
4. **Start the API server** and test GraphQL queries
5. **Explore the documentation** at http://localhost:3001

## Getting Help

- Check the [API Documentation](./docs/docs/intro.md)
- Review [Development Guide](./DEVELOPMENT.md)
- See [Contributing Guide](./CONTRIBUTING.md)
- Open an [Issue](https://github.com/aucoeur/rpdrAPI/issues) for bugs
