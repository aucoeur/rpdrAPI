# RuPaul's Drag Race API Documentation

This is the documentation site for the RuPaul's Drag Race API, built with Docusaurus.

## Structure

```
docs-docusaurus/
├── docs/                    # Public API documentation
│   ├── api/                 # API reference
│   │   ├── rest/           # REST API docs
│   │   └── graphql/        # GraphQL API docs
│   ├── getting-started/     # User onboarding
│   ├── internal/           # Internal docs (excluded from build)
│   └── intro.md            # Homepage
├── src/                    # Docusaurus source files
├── static/                 # Static assets
└── docusaurus.config.ts    # Configuration
```

## Key Features

- **Public API Documentation**: REST and GraphQL API references
- **Internal Documentation**: Excluded from public build
- **Modern Design**: Built with Docusaurus v3
- **Search**: Built-in search functionality
- **Responsive**: Mobile-friendly design
- **GitHub Integration**: Edit links and repository integration

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
cd docs-docusaurus
npm install
```

### Development Server
```bash
npm start
```

### Build
```bash
npm run build
```

### Serve Built Site
```bash
npm run serve
```

## Configuration

The documentation is configured in `docusaurus.config.ts`:

- **Excludes internal docs**: `exclude: ['internal/**/*']`
- **GitHub integration**: Edit URLs and repository links
- **Custom theme**: RuPaul's Drag Race branding
- **Search**: Built-in search functionality

## Deployment

The documentation can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

### GitHub Pages
```bash
npm run deploy
```

## Content Guidelines

### Public Documentation
- API endpoints and examples
- Authentication guides
- Getting started tutorials
- Code examples

### Internal Documentation
- Architecture decisions
- Development processes
- Internal procedures
- System design documents

## Maintenance

- Keep API documentation current with code changes
- Update examples when API changes
- Maintain internal documentation for development processes
- Regular review of content accuracy
