# RuPaul's Drag Race API

> Hey Squirrel Friends! When one database ends, just open up another. Go ahead, I support you 😘 
>
> Look over there! https://shiraamitchell.github.io/rpdr

--------------

**Modern TypeScript/GraphQL/PostgreSQL API** for retrieving information about award-winning reality TV series, RuPaul's Drag Race. Built with a **monorepo architecture** using **npm workspaces**.

<p align="center">
<img src="./docs/screencap.png" width="300" alt="screenshot of JSON results from sample GET requests"/>
</p>

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and **npm 9+**
- **Docker** and **Docker Compose** (recommended)
- **PostgreSQL** and **Redis** (if not using Docker)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aucoeur/rpdrAPI.git
   cd rpdrAPI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development environment**:
   ```bash
   # Option 1: Docker (recommended)
   docker-compose up
   
   # Option 2: Local development
   npm run api:dev
   ```

5. **Access the API**:
   - **GraphQL Playground**: http://localhost:4000
   - **API Documentation**: http://localhost:3001 (docs)

## 📁 Project Structure

This is a **monorepo** with three main packages:

```
rpdr-api/
├── packages/
│   ├── api/                 # GraphQL + REST API
│   │   ├── src/
│   │   │   ├── schema/      # GraphQL schema definitions
│   │   │   ├── resolvers/   # GraphQL resolvers
│   │   │   ├── services/    # Business logic layer
│   │   │   ├── middleware/  # Auth, validation, rate limiting
│   │   │   └── types/       # TypeScript type definitions
│   │   ├── tests/           # Integration and unit tests
│   │   └── prisma/          # Database schema and migrations
│   ├── data-pipeline/       # ETL and data scraping
│   │   ├── src/
│   │   │   ├── scrapers/    # Web scraping logic
│   │   │   ├── transformers/ # Data transformation
│   │   │   ├── validators/  # Data validation
│   │   │   └── loaders/     # Database loading
│   │   └── tests/
│   └── shared/              # Shared utilities and types
│       ├── types/           # Common TypeScript definitions
│       ├── schemas/         # Zod validation schemas
│       └── utils/           # Shared utilities
├── docs/                    # Public API documentation
├── docker-compose.yml       # Development environment
└── scripts/                 # Development scripts
```

## 🛠️ Development Commands

### Root Level Commands
```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Run tests across all packages
npm run test

# Run linting across all packages
npm run lint

# Type check all packages
npm run type-check

# Clean all build artifacts
npm run clean
```

### Package-Specific Commands
```bash
# API Package
npm run api:dev          # Start API in development mode
npm run api:build        # Build API package
npm run api:start        # Start API in production mode

# Data Pipeline Package
npm run pipeline:dev     # Start data pipeline in development mode
npm run pipeline:build   # Build data pipeline package
npm run pipeline:start   # Start data pipeline in production mode

# Documentation
npm run docs:dev         # Start documentation site
npm run docs:build       # Build documentation
npm run docs:serve       # Serve built documentation
```

### Legacy API (MongoDB/Express)
```bash
npm run legacy:start     # Start legacy MongoDB API
npm run legacy:dev       # Start legacy API in development mode
npm run legacy:test      # Run legacy API tests
```

## 🎯 API Usage

### GraphQL API (Modern)

The new API uses **GraphQL** with the following main queries:

```graphql
# Get all queens with filtering and pagination
query GetQueens($filter: QueenFilter, $pagination: PaginationInput) {
  queens(filter: $filter, pagination: $pagination) {
    edges {
      node {
        id
        name
        legalName
        hometown
        socialMedia {
          instagram
          twitter
        }
        stats {
          totalSeasons
          totalChallengeWins
          isWinner
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}

# Get a specific queen
query GetQueen($id: ID!) {
  queen(id: $id) {
    id
    name
    legalName
    birthDate
    hometown
    seasons {
      seasonId
      placement
      challengeWins
      isWinner
    }
  }
}

# Get seasons with filtering
query GetSeasons($filter: SeasonFilter) {
  seasons(filter: $filter) {
    edges {
      node {
        id
        number
        type
        franchise
        premiereDate
        queens {
          queenId
          placement
        }
      }
    }
  }
}
```

### REST API (Legacy)

The legacy MongoDB/Express API is still available for backward compatibility:

#### Queens
- `GET /api/queen/all` - Get all queens
- `GET /api/queen/:id` - Get queen by ID
- `POST /api/queen` - Create new queen (authenticated)
- `PUT /api/queen/:id` - Update queen (authenticated)
- `DELETE /api/queen/:id` - Delete queen (authenticated)

#### Seasons
- `GET /api/season/all` - Get all seasons
- `GET /api/season/:id` - Get season by ID
- `POST /api/season/` - Create new season (authenticated)
- `PUT /api/season/:id` - Update season (authenticated)
- `DELETE /api/season/:id` - Delete season (authenticated)

#### Episodes
- `GET /api/season/:seasonID/episode/` - Get all episodes for a season
- `GET /api/season/:seasonID/episode/:episodeID` - Get specific episode
- `POST /api/season/:seasonID/episode/` - Create new episode (authenticated)
- `PUT /api/season/:seasonID/episode/:episodeID` - Update episode (authenticated)
- `DELETE /api/season/:seasonID/episode/:episodeID` - Delete episode (authenticated)

## 🔧 Technology Stack

### Modern Stack (v2.0)
- **Runtime**: Node.js 18+ with TypeScript
- **API**: Apollo GraphQL Server + Express
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Validation**: Zod schemas
- **Testing**: Jest + Supertest
- **Documentation**: Docusaurus
- **Deployment**: Docker + GCP Cloud Run

### Legacy Stack (v1.0)
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Testing**: Mocha + Chai

## 🐳 Docker Development

The project includes a complete Docker development environment:

```bash
# Start all services
docker-compose up

# Start specific services
docker-compose up postgres redis api

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down
```

Services included:
- **PostgreSQL** (port 5432) - Main database
- **Redis** (port 6379) - Caching layer
- **API** (port 4000) - GraphQL/REST API
- **Data Pipeline** - ETL and scraping service

## 📚 Documentation

- **API Documentation**: [docs/intro.md](./docs/docs/intro.md)
- **Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Contributing Guide**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Architecture Decisions**: [docs/internal/adr/](./docs/internal/adr/)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific package tests
cd packages/api && npm test
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Docker
```bash
docker-compose -f docker-compose.prod.yml up
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original API by [Aucoeur Ngo](https://github.com/aucoeur)
- Data source: [RuPaul's Drag Race Wiki](https://rupaulsdragrace.fandom.com/)
- Inspiration: [Shira Mitchell's RPDR Data](https://shiraamitchell.github.io/rpdr)

---

**Note**: This API is under active development. The modern GraphQL API (v2.0) is the primary focus, while the legacy MongoDB API (v1.0) is maintained for backward compatibility.
