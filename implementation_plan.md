# Implementation Plan - RuPaul's Drag Race API Modernization

## Context
To modernize this existing RuPaul's Drag Race API from a MongoDB/Express.js setup to a modern TypeScript/GraphQL/PostgreSQL architecture deployed on GCP. This is a career development project to demonstrate 2-3 year Software Engineer level skills.

## Existing Codebase Structure
```
Current repo has:
- Express.js API with MongoDB/Mongoose
- JWT authentication
- REST endpoints for Queens, Seasons, Episodes
- Mocha/Chai tests
- Nested resource handling (seasons/episodes, seasons/queens)
```

## Target Modern Architecture

### Tech Stack
```typescript
Backend: Node.js + TypeScript + Apollo GraphQL Server
Database: PostgreSQL + Prisma ORM
Caching: Upstash Redis (free tier) or local Redis
Testing: Jest + Supertest + GraphQL Testing
Validation: Zod schemas
Documentation: GraphQL introspection + auto-generated docs
Deployment: Google Cloud Platform (Cloud Run + Cloud SQL)
Infrastructure: Terraform
CI/CD: GitHub Actions
```

### Project Structure
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
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── data-pipeline/       # ETL and data scraping
│   │   ├── src/
│   │   │   ├── scrapers/    # Web scraping logic
│   │   │   ├── transformers/ # Data transformation
│   │   │   ├── validators/  # Data validation
│   │   │   └── loaders/     # Database loading
│   │   └── tests/
│   ├── shared/              # Shared utilities and types
│   │   ├── types/           # Common TypeScript definitions
│   │   ├── schemas/         # Zod validation schemas
│   │   └── utils/           # Shared utilities
│   └── docs/                # Documentation site (future)
├── terraform/               # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── .github/workflows/       # CI/CD pipelines
├── docker-compose.yml       # Local development environment
└── README.md
```

## Data Models (Enhanced from Current)

### Core Types
```typescript
// Enhanced from current MongoDB models
interface Queen {
  id: string
  name: string
  legalName?: string
  birthDate?: Date
  hometown?: string
  socialMedia: {
    instagram?: string
    twitter?: string
    tiktok?: string
    website?: string
  }
  seasons: SeasonParticipation[]
  stats: QueenStats
  createdAt: Date
  updatedAt: Date
}

interface Season {
  id: string
  number: number
  type: SeasonType // REGULAR | ALL_STARS | UK | INTERNATIONAL
  franchise: string // US, UK, Canada, etc.
  premiereDate: Date
  finaleDate?: Date
  episodes: Episode[]
  queens: SeasonParticipation[]
  createdAt: Date
  updatedAt: Date
}

interface Episode {
  id: string
  seasonId: string
  number: number
  title: string
  airDate: Date
  challenges: Challenge[]
  eliminations: Elimination[]
  createdAt: Date
  updatedAt: Date
}

interface SeasonParticipation {
  id: string
  queenId: string
  seasonId: string
  placement: number
  episodeCount: number
  challengeWins: number
  lipSyncWins: number
  isWinner: boolean
  isMissCongenialiy: boolean
}
```

### GraphQL Schema
```graphql
type Query {
  # Queens
  queens(
    filter: QueenFilter
    pagination: PaginationInput
    sort: QueenSort
  ): QueenConnection!
  
  queen(id: ID, name: String): Queen
  
  # Seasons
  seasons(
    filter: SeasonFilter
    pagination: PaginationInput
  ): SeasonConnection!
  
  season(id: ID, number: Int, franchise: String): Season
  
  # Episodes
  episodes(seasonId: ID!, pagination: PaginationInput): EpisodeConnection!
  episode(id: ID!): Episode
  
  # Search
  search(query: String!, type: SearchType): SearchResults!
}

type Mutation {
  # Admin only mutations
  updateQueen(id: ID!, input: QueenUpdateInput!): Queen
  updateSeason(id: ID!, input: SeasonUpdateInput!): Season
  updateEpisode(id: ID!, input: EpisodeUpdateInput!): Episode
}

type Subscription {
  seasonUpdated(seasonId: ID!): Season
  newEpisode: Episode
}
```

## Implementation Tasks

### Phase 1: Repository Refactoring & Setup

1. **Initialize Modern Monorepo**
   ```bash
   # Convert to monorepo with workspaces
   npm init -w packages/api -w packages/data-pipeline -w packages/shared
   ```

2. **TypeScript Configuration**
   - Strict TypeScript setup with proper tsconfig.json
   - Shared TypeScript config for all packages
   - ESLint + Prettier configuration
   - Husky pre-commit hooks

3. **Docker Development Environment**
   - docker-compose.yml with PostgreSQL, Redis
   - Dockerfile for each package
   - Development environment setup script

4. **Database Migration Planning**
   - Analyze current MongoDB data structure
   - Design PostgreSQL schema with proper relationships
   - Create Prisma schema file
   - Plan data migration strategy from MongoDB to PostgreSQL

### Phase 2: Core API Implementation

1. **Prisma Setup**
   - Generate Prisma schema from TypeScript types
   - Set up database connections and migrations
   - Seed script for initial data

2. **GraphQL API Foundation**
   - Apollo Server setup with TypeScript
   - Basic resolvers for Queen, Season, Episode
   - DataLoader implementation for N+1 query prevention
   - Proper error handling and validation

3. **Authentication & Security**
   - JWT token validation middleware
   - GraphQL Shield for permission-based access
   - Rate limiting implementation
   - Input validation with Zod

4. **Testing Infrastructure**
   - Jest setup for GraphQL testing
   - Test database setup and teardown
   - Integration tests for all resolvers
   - Mock data factories

### Phase 3: Advanced Features

1. **Performance Optimization**
   - Redis caching layer integration (Upstash for free tier)
   - Query complexity analysis
   - Database indexing strategy
   - Response compression and CDN headers

2. **Data Pipeline Foundation**
   - Playwright setup for web scraping
   - Data validation and transformation utilities
   - Error handling and retry logic
   - Scheduled job infrastructure

3. **Monitoring & Observability**
   - Structured logging with winston
   - Health check endpoints
   - Metrics collection
   - Error tracking integration

### Phase 4: Deployment & Infrastructure

1. **Terraform Infrastructure**
   - GCP Cloud Run service configuration
   - Cloud SQL PostgreSQL setup
   - IAM and security configuration
   - Environment variable management

2. **CI/CD Pipeline**
   - GitHub Actions workflows
   - Automated testing and linting
   - Docker image building and pushing
   - Deployment automation

3. **Production Readiness**
   - Environment-specific configurations
   - Database migration strategies
   - Rollback procedures
   - Performance monitoring

## Initial Data Source
- Start with data from: https://docs.google.com/spreadsheets/d/1Sotvl3o7J_ckKUg5sRiZTqNQn3hPqhepBSeOpMTK15Q/edit?gid=0#gid=0
- Focus on US seasons 1-11 initially
- Plan for expansion to other franchises

## Key Requirements

### Code Quality
- 90%+ test coverage
- Strict TypeScript with no `any` types
- Comprehensive error handling
- Proper logging and monitoring
- Documentation for all public APIs

### Performance
- GraphQL queries under 200ms
- Proper pagination for large datasets
- Efficient database queries with appropriate indexes
- Caching strategy for frequently accessed data

### Security
- Input validation on all mutations
- Rate limiting to prevent abuse
- Proper authentication and authorization
- SQL injection prevention
- CORS configuration

### Professional Practices
- Semantic versioning
- Conventional commit messages
- Proper Git workflow with feature branches
- Code review process simulation
- Automated deployment pipeline

## Expected Deliverables

1. **Modernized Codebase**
   - Clean, well-documented TypeScript code
   - Comprehensive test suite
   - Professional project structure

2. **Production Deployment**
   - Live API deployed on GCP
   - Automated CI/CD pipeline
   - Infrastructure as Code with Terraform

3. **Documentation**
   - Comprehensive README
   - API documentation (auto-generated from GraphQL schema)
   - Architecture decision records
   - Deployment and development guides

4. **Showcase Features**
   - GraphQL Playground for API exploration
   - Performance metrics and monitoring
   - Scalable architecture patterns
   - Professional development practices

## Success Metrics
- API response times consistently under 200ms
- 99.9% uptime in production
- Comprehensive test coverage above 90%
- Clean, maintainable code that passes all linting rules
- Professional deployment with proper monitoring and alerts

Please help me implement this modernization step by step, starting with the repository refactoring and monorepo setup. Focus on creating a solid foundation that demonstrates professional software engineering practices.
