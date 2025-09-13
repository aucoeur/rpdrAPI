# API Changelog

This document tracks changes to the RuPaul's Drag Race API.

## Version 1.0.1 (Current)

### Added
- Initial API release
- REST endpoints for Queens, Seasons, and Episodes
- JWT authentication system
- Basic CRUD operations for authenticated users

### Endpoints
- `GET /api/queen/all` - Get all queens
- `GET /api/queen/:id` - Get specific queen
- `POST /api/queen` - Create new queen (authenticated)
- `PUT /api/queen/:id` - Update queen (authenticated)
- `DELETE /api/queen/:id` - Delete queen (authenticated)
- `GET /api/season/all` - Get all seasons
- `GET /api/season/:id` - Get specific season
- `POST /api/season` - Create new season (authenticated)
- `PUT /api/season/:id` - Update season (authenticated)
- `DELETE /api/season/:id` - Delete season (authenticated)
- `GET /api/season/:seasonId/episode/` - Get episodes for season
- `GET /api/season/:seasonId/episode/:episodeId` - Get specific episode
- `POST /api/season/:seasonId/episode/` - Create new episode (authenticated)
- `PUT /api/season/:seasonId/episode/:episodeId` - Update episode (authenticated)
- `DELETE /api/season/:seasonId/episode/:episodeId` - Delete episode (authenticated)

### Authentication
- JWT token-based authentication
- Protected endpoints require `Authorization: Bearer <token>` header
- Token expiration: 24 hours

### Data Models
- **Queen**: name, legalName, birthDate, seasons
- **Season**: seasonNumber, premiereDate, seriesType, episodes, queens
- **Episode**: episodeNumber, title, airDate, season

## Upcoming Features

### Version 2.0.0 (Planned)
- GraphQL API
- PostgreSQL migration
- Enhanced data models
- Advanced filtering and search
- Rate limiting
- API versioning
- Webhook support

### Version 2.1.0 (Planned)
- Real-time subscriptions
- Bulk operations
- Advanced analytics
- Admin dashboard
- Data export features

## Breaking Changes

None in current version.

## Migration Guide

### From v1.0.0 to v1.0.1
No breaking changes. All existing endpoints remain compatible.

## Support

For questions about API changes or migration assistance:
- [GitHub Issues](https://github.com/aucoeur/rpdrAPI/issues)
- [GitHub Discussions](https://github.com/aucoeur/rpdrAPI/discussions)
