# Architectural Decisions

## ADR-001: Monorepo Structure
**Date**: December 2024
**Status**: Accepted

### Context
Current codebase is a single Express.js application. Need to modernize to support multiple packages (API, data pipeline, shared utilities).

### Decision
Use npm workspaces for monorepo structure:
```
packages/
├── api/           # GraphQL + REST API
├── data-pipeline/ # ETL and scraping
└── shared/        # Common utilities and types
```

### Rationale
- Better code organization and reusability
- Simplified dependency management
- Easier testing and deployment
- Industry standard for modern Node.js projects

## ADR-002: GraphQL + REST Hybrid
**Date**: December 2024
**Status**: Accepted

### Context
Need to modernize API while maintaining backward compatibility.

### Decision
Implement GraphQL as primary API with REST endpoints for backward compatibility.

### Rationale
- GraphQL provides better developer experience
- REST maintains existing client compatibility
- Gradual migration path for consumers
- Better performance with selective field loading

## ADR-003: PostgreSQL Migration
**Date**: December 2024
**Status**: Accepted

### Context
Current MongoDB setup needs modernization for better relational data handling.

### Decision
Migrate to PostgreSQL with Prisma ORM.

### Rationale
- Better ACID compliance
- Superior relational data handling
- Prisma provides excellent TypeScript integration
- Better performance for complex queries
- Industry standard for production applications

## ADR-004: Documentation Structure
**Date**: December 2024
**Status**: Accepted

### Context
Need to separate public API documentation from internal development documentation.

### Decision
Use separate directories:
- `/docs` - Public API documentation for end users
- `/docs-dev` - Internal development documentation
- `/.ai-context` - AI collaboration context

### Rationale
- Clear separation of concerns
- Better user experience for API consumers
- Organized internal documentation for developers
- Efficient AI agent collaboration
- Industry standard documentation practices
