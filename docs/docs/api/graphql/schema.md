# GraphQL Schema

The RuPaul's Drag Race API provides a comprehensive GraphQL schema for querying data about queens, seasons, episodes, and more.

## Schema Overview

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

## Core Types

### Queen

```graphql
type Queen {
  id: ID!
  name: String!
  legalName: String
  birthDate: Date
  hometown: String
  socialMedia: SocialMedia
  seasons: [SeasonParticipation!]!
  stats: QueenStats!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SocialMedia {
  instagram: String
  twitter: String
  tiktok: String
  website: String
}

type QueenStats {
  totalSeasons: Int!
  totalEpisodes: Int!
  challengeWins: Int!
  lipSyncWins: Int!
  isWinner: Boolean!
  isMissCongeniality: Boolean!
}

type SeasonParticipation {
  id: ID!
  queenId: ID!
  seasonId: ID!
  placement: Int!
  episodeCount: Int!
  challengeWins: Int!
  lipSyncWins: Int!
  isWinner: Boolean!
  isMissCongeniality: Boolean!
}
```

### Season

```graphql
type Season {
  id: ID!
  number: Int!
  type: SeasonType!
  franchise: String!
  premiereDate: Date!
  finaleDate: Date
  episodes: [Episode!]!
  queens: [SeasonParticipation!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum SeasonType {
  REGULAR
  ALL_STARS
  UK
  INTERNATIONAL
}
```

### Episode

```graphql
type Episode {
  id: ID!
  seasonId: ID!
  number: Int!
  title: String!
  airDate: Date!
  challenges: [Challenge!]!
  eliminations: [Elimination!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Challenge {
  id: ID!
  name: String!
  type: ChallengeType!
  winner: Queen
}

type Elimination {
  id: ID!
  queen: Queen!
  episode: Episode!
  reason: EliminationReason!
}

enum ChallengeType {
  DESIGN
  ACTING
  COMEDY
  DANCE
  SINGING
  IMPERSONATION
  LIPSYNC
}

enum EliminationReason {
  LIPSYNC
  VOLUNTARY
  DISQUALIFICATION
}
```

## Input Types

### Filters

```graphql
input QueenFilter {
  name: String
  hometown: String
  seasonId: ID
  isWinner: Boolean
  isMissCongeniality: Boolean
}

input SeasonFilter {
  number: Int
  type: SeasonType
  franchise: String
  year: Int
}

input PaginationInput {
  first: Int
  after: String
  last: Int
  before: String
}

input QueenSort {
  field: QueenSortField!
  direction: SortDirection!
}

enum QueenSortField {
  NAME
  BIRTH_DATE
  CREATED_AT
}

enum SortDirection {
  ASC
  DESC
}
```

### Update Inputs

```graphql
input QueenUpdateInput {
  name: String
  legalName: String
  birthDate: Date
  hometown: String
  socialMedia: SocialMediaInput
}

input SocialMediaInput {
  instagram: String
  twitter: String
  tiktok: String
  website: String
}

input SeasonUpdateInput {
  number: Int
  type: SeasonType
  franchise: String
  premiereDate: Date
  finaleDate: Date
}

input EpisodeUpdateInput {
  number: Int
  title: String
  airDate: Date
}
```

## Connection Types

```graphql
type QueenConnection {
  edges: [QueenEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type QueenEdge {
  node: Queen!
  cursor: String!
}

type SeasonConnection {
  edges: [SeasonEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type SeasonEdge {
  node: Season!
  cursor: String!
}

type EpisodeConnection {
  edges: [EpisodeEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type EpisodeEdge {
  node: Episode!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

## Search

```graphql
type SearchResults {
  queens: [Queen!]!
  seasons: [Season!]!
  episodes: [Episode!]!
  totalCount: Int!
}

enum SearchType {
  QUEEN
  SEASON
  EPISODE
  ALL
}
```

## Scalar Types

```graphql
scalar Date
scalar DateTime
```

The `Date` scalar represents a date in YYYY-MM-DD format.
The `DateTime` scalar represents a date and time in ISO 8601 format.

## Introspection

You can explore the full schema using GraphQL introspection:

```graphql
query IntrospectionQuery {
  __schema {
    types {
      name
      description
    }
  }
}
```

This schema provides a comprehensive and type-safe way to query the RuPaul's Drag Race API data with powerful filtering, pagination, and search capabilities.
