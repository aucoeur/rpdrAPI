# ADR-001: Monorepo Structure

## Status
Accepted

## Context
The current codebase is a single Express.js application with MongoDB. We need to modernize this to support multiple packages including:
- GraphQL + REST API
- Data pipeline for ETL and scraping
- Shared utilities and types
- Future documentation site

## Decision
Use npm workspaces for monorepo structure with the following organization:

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
├── .github/workflows/       # CI/CD pipelines
├── docker-compose.yml       # Local development environment
└── README.md
```

## Rationale
1. **Code Organization**: Clear separation of concerns with dedicated packages
2. **Dependency Management**: npm workspaces handle shared dependencies efficiently
3. **Independent Deployment**: Each package can be deployed independently
4. **Testing**: Easier to test individual packages in isolation
5. **Scalability**: Easy to add new packages as the project grows
6. **Industry Standard**: Common pattern in modern Node.js projects

## Alternatives Considered
- **Lerna**: More complex setup, npm workspaces is sufficient
- **Single Package**: Would become unwieldy as project grows
- **Separate Repositories**: Would complicate dependency management

## Consequences
### Positive
- Better code organization and maintainability
- Easier testing and deployment
- Clear separation of concerns
- Scalable architecture

### Negative
- Slightly more complex initial setup
- Need to manage workspace dependencies
- More files and directories to navigate

## Implementation
1. Restructure existing code into `packages/api/`
2. Create `packages/shared/` for common utilities
3. Set up `packages/data-pipeline/` for future ETL work
4. Configure npm workspaces in root package.json
5. Update build and deployment scripts
