# RuPaul's Drag Race API Documentation

Welcome to the official documentation for the RuPaul's Drag Race API! This API provides comprehensive data about queens, seasons, episodes, and more from the award-winning reality TV series.

## 🚀 Quick Start

- **[Installation Guide](./getting-started/installation.md)** - Get up and running quickly
- **[API Endpoints](./api/rest/endpoints.md)** - Complete REST API reference
- **[Authentication](./api/rest/authentication.md)** - How to authenticate your requests
- **[Examples](./getting-started/examples.md)** - Code examples and use cases

## 📚 API Reference

### REST API
- **[Endpoints](./api/rest/endpoints.md)** - Complete endpoint documentation
- **[Authentication](./api/rest/authentication.md)** - JWT authentication guide
- **[Examples](./api/rest/examples.md)** - Request/response examples

### GraphQL API (Coming Soon)
- **[Schema](./api/graphql/schema.md)** - GraphQL schema documentation
- **[Queries](./api/graphql/queries.md)** - Query examples and patterns
- **[Mutations](./api/graphql/mutations.md)** - Mutation operations

## 🔄 API Versions

- **[Changelog](./api/changelog.md)** - API version history and changes
- **Current Version**: v1.0.1
- **Base URL**: `https://api.rpdr.com` (production)

## 📖 Getting Started

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/aucoeur/rpdrAPI.git
cd rpdrAPI

# Install dependencies
npm install

# Start the server
npm start
```

### 2. Make Your First Request
```bash
# Get all queens
curl https://api.rpdr.com/api/queen/all

# Get a specific queen
curl https://api.rpdr.com/api/queen/5e5da29fb479040e7ca22c3d
```

### 3. Authentication
For protected endpoints, include your JWT token:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.rpdr.com/api/queen
```

## 🎯 What's Available

### Queens
- Get all queens or specific queen by ID
- Create, update, or delete queens (authenticated)
- Search and filter capabilities

### Seasons
- Browse all seasons or get specific season details
- Access season metadata and air dates
- Manage seasons (authenticated)

### Episodes
- Get episodes for specific seasons
- Access episode details and air dates
- Manage episodes (authenticated)

## 🔧 Development

- **[Contributing Guide](https://github.com/aucoeur/rpdrAPI/blob/main/CONTRIBUTING.md)** - How to contribute to the project
- **[Development Setup](https://github.com/aucoeur/rpdrAPI/blob/main/DEVELOPMENT.md)** - Local development environment

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/aucoeur/rpdrAPI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aucoeur/rpdrAPI/discussions)
- **Documentation**: This site

---

*Hey Squirrel Friends! When one database ends, just open up another. Go ahead, I support you 😘*
