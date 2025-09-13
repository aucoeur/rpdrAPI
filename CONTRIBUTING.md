# Contributing to RuPaul's Drag Race API

## Development Workflow

### Branching Strategy
We use **Git Flow** with the following branches:
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features (e.g., `feature/graphql-api`)
- `hotfix/*` - Critical fixes (e.g., `hotfix/security-patch`)
- `release/*` - Release preparation (e.g., `release/v2.0.0`)

### Commit Message Format
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(api): add GraphQL resolvers for Queen queries
fix(auth): resolve JWT token validation issue
docs(readme): update installation instructions
refactor(models): migrate from Mongoose to Prisma
test(queens): add integration tests for Queen service
chore(deps): update Apollo Server to v4
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes with proper commit messages
3. Add/update tests as needed
4. Ensure all tests pass
5. Update documentation
6. Create PR to `develop` branch
7. Request code review
8. Merge after approval

### Code Standards
- **TypeScript**: Strict mode enabled, no `any` types
- **Testing**: 90%+ coverage required
- **Documentation**: JSDoc for all public functions
- **Linting**: ESLint + Prettier configuration
- **Security**: Input validation on all mutations

### Development Setup
See [DEVELOPMENT.md](./DEVELOPMENT.md) for local setup instructions.

### Release Process
1. Create release branch from `develop`
2. Update version numbers and changelog
3. Run full test suite
4. Create PR to `main`
5. Tag release with semantic version
6. Deploy to production

## Questions?
- Check existing issues first
- Create new issue for bugs/features
- Use discussions for questions
