# Git Workflow

This document outlines the Git workflow and branching strategy for the RuPaul's Drag Race API project.

## Branching Strategy

We use **Git Flow** with the following branch structure:

```
main (production-ready)
├── develop (integration branch)
├── feature/* (new features)
├── hotfix/* (critical fixes)
└── release/* (release preparation)
```

### Branch Types

#### `main`
- **Purpose**: Production-ready code
- **Protection**: Protected branch, requires PR
- **Deployment**: Automatically deployed to production
- **Merges**: Only from `develop` or `hotfix/*` branches

#### `develop`
- **Purpose**: Integration branch for features
- **Protection**: Protected branch, requires PR
- **Deployment**: Automatically deployed to staging
- **Merges**: From `feature/*` branches

#### `feature/*`
- **Purpose**: New features and enhancements
- **Naming**: `feature/description` (e.g., `feature/graphql-api`)
- **Base**: Always branch from `develop`
- **Merges**: Back to `develop` via PR

#### `hotfix/*`
- **Purpose**: Critical production fixes
- **Naming**: `hotfix/description` (e.g., `hotfix/security-patch`)
- **Base**: Branch from `main`
- **Merges**: Back to both `main` and `develop`

#### `release/*`
- **Purpose**: Release preparation
- **Naming**: `release/version` (e.g., `release/v2.0.0`)
- **Base**: Branch from `develop`
- **Merges**: Back to both `main` and `develop`

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Scopes
- `api`: API-related changes
- `auth`: Authentication changes
- `db`: Database changes
- `deps`: Dependency updates
- `docs`: Documentation updates
- `test`: Test-related changes

### Examples
```
feat(api): add GraphQL resolvers for Queen queries
fix(auth): resolve JWT token validation issue
docs(readme): update installation instructions
refactor(models): migrate from Mongoose to Prisma
test(queens): add integration tests for Queen service
chore(deps): update Apollo Server to v4
```

## Pull Request Process

### 1. Create Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Write code following project standards
- Add/update tests as needed
- Update documentation
- Use conventional commit messages

### 3. Push and Create PR
```bash
git push origin feature/your-feature-name
# Create PR via GitHub UI
```

### 4. PR Requirements
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] PR description explains changes
- [ ] No merge conflicts

### 5. Code Review
- At least one approval required
- Address review feedback
- Update PR as needed

### 6. Merge
- Squash and merge to `develop`
- Delete feature branch
- Update related issues

## Release Process

### 1. Create Release Branch
```bash
git checkout develop
git pull origin develop
git checkout -b release/v2.0.0
```

### 2. Prepare Release
- Update version numbers
- Update CHANGELOG.md
- Run full test suite
- Update documentation

### 3. Create PR to Main
```bash
git push origin release/v2.0.0
# Create PR to main
```

### 4. Deploy and Tag
- Merge to `main`
- Create git tag: `git tag v2.0.0`
- Push tag: `git push origin v2.0.0`
- Deploy to production

### 5. Merge Back to Develop
```bash
git checkout develop
git merge main
git push origin develop
```

## Hotfix Process

### 1. Create Hotfix Branch
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix
```

### 2. Make Fix
- Implement minimal fix
- Add tests
- Update documentation if needed

### 3. Deploy Fix
- Create PR to `main`
- Merge and deploy immediately
- Tag new patch version

### 4. Merge Back to Develop
```bash
git checkout develop
git merge main
git push origin develop
```

## Best Practices

### Branch Management
- Keep branches focused and small
- Delete merged branches
- Use descriptive branch names
- Keep branches up to date

### Commit Practices
- Make atomic commits
- Write clear commit messages
- Test before committing
- Use conventional commit format

### PR Practices
- Write descriptive PR titles
- Include detailed descriptions
- Link related issues
- Request appropriate reviewers
- Keep PRs focused and reviewable

### Code Review
- Review code, not the person
- Be constructive and specific
- Test the changes locally
- Approve when ready
- Request changes when needed

## Tools and Automation

### GitHub Actions
- Automated testing on PRs
- Automated deployment on merge
- Branch protection rules
- Automated dependency updates

### Branch Protection
- `main` and `develop` branches protected
- Require PR reviews
- Require status checks
- Require up-to-date branches

### Hooks
- Pre-commit hooks for linting
- Commit message validation
- Automated testing
- Code formatting
