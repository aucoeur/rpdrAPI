# Development Documentation

This directory contains internal development documentation for the RuPaul's Drag Race API project. This documentation is intended for developers working on the project, not for API consumers.

## 📁 Structure

### Architecture Decision Records (ADR)
- **[001: Monorepo Structure](./adr/001-monorepo-structure.md)** - Decision to use npm workspaces
- **[002: GraphQL + REST Hybrid](./adr/002-graphql-vs-rest.md)** - API architecture decision
- **[003: PostgreSQL Migration](./adr/003-postgresql-migration.md)** - Database migration strategy

### Architecture
- **[Overview](./architecture/overview.md)** - High-level system architecture
- **[Database Design](./architecture/database-design.md)** - Database schema and relationships
- **[Deployment Architecture](./architecture/deployment.md)** - Production deployment setup

### Development
- **[Local Setup](./development/local-setup.md)** - Detailed development environment setup
- **[Testing Strategy](./development/testing.md)** - Testing approaches and guidelines
- **[Debugging Guide](./development/debugging.md)** - Debugging tools and techniques

### Processes
- **[Git Workflow](./processes/git-workflow.md)** - Git branching and commit procedures
- **[Code Review Process](./processes/code-review.md)** - Code review guidelines
- **[Release Process](./processes/release-process.md)** - Release and deployment procedures

## 🎯 Purpose

This documentation serves several purposes:

1. **Onboarding** - Help new developers understand the project structure and processes
2. **Decision Tracking** - Record architectural decisions and their rationale
3. **Process Documentation** - Standardize development workflows
4. **Knowledge Sharing** - Share insights and best practices

## 🔄 Maintenance

- **ADRs** should be created for significant architectural decisions
- **Process docs** should be updated when workflows change
- **Architecture docs** should reflect current system state
- **Development docs** should be kept current with tooling changes

## 📝 Contributing

When updating this documentation:

1. Follow the established structure
2. Use clear, concise language
3. Include examples where helpful
4. Update the README when adding new sections
5. Keep documentation current with code changes

## 🔗 Related Documentation

- **[Public API Docs](../docs/)** - User-facing API documentation
- **[Contributing Guide](../CONTRIBUTING.md)** - How to contribute to the project
- **[Development Setup](../DEVELOPMENT.md)** - Quick development setup guide
