import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    queens(
      filter: QueenFilter
      pagination: PaginationInput
      sort: QueenSort
    ): QueenConnection!

    queen(id: ID, name: String): Queen

    seasons(
      filter: SeasonFilter
      pagination: PaginationInput
    ): SeasonConnection!

    season(id: ID, number: Int, franchise: String): Season

    episodes(seasonId: ID!, pagination: PaginationInput): EpisodeConnection!
    episode(id: ID!): Episode

    search(query: String!, type: SearchType): SearchResults!
  }

  type Mutation {
    updateQueen(id: ID!, input: QueenUpdateInput!): Queen
    updateSeason(id: ID!, input: SeasonUpdateInput!): Season
    updateEpisode(id: ID!, input: EpisodeUpdateInput!): Episode
  }

  type Subscription {
    seasonUpdated(seasonId: ID!): Season
    newEpisode: Episode
  }

  type Queen {
    id: ID!
    name: String!
    legalName: String
    birthDate: String
    hometown: String
    socialMedia: SocialMedia!
    seasons: [SeasonParticipation!]!
    stats: QueenStats!
    createdAt: String!
    updatedAt: String!
  }

  type Season {
    id: ID!
    number: Int!
    type: SeasonType!
    franchise: String!
    premiereDate: String!
    finaleDate: String
    episodes: [Episode!]!
    queens: [SeasonParticipation!]!
    createdAt: String!
    updatedAt: String!
  }

  type Episode {
    id: ID!
    seasonId: ID!
    number: Int!
    title: String!
    airDate: String!
    challenges: [Challenge!]!
    eliminations: [Elimination!]!
    createdAt: String!
    updatedAt: String!
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

  type QueenStats {
    totalSeasons: Int!
    totalEpisodes: Int!
    totalChallengeWins: Int!
    totalLipSyncWins: Int!
    averagePlacement: Float!
    isWinner: Boolean!
    isMissCongeniality: Boolean!
  }

  type SocialMedia {
    instagram: String
    twitter: String
    tiktok: String
    website: String
  }

  type Challenge {
    id: ID!
    name: String!
    type: ChallengeType!
    description: String
  }

  type Elimination {
    id: ID!
    queenId: ID!
    episodeId: ID!
    reason: EliminationReason!
    lipSyncSong: String
    lipSyncOpponent: String
  }

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

  type SearchResults {
    queens: [Queen!]!
    seasons: [Season!]!
    episodes: [Episode!]!
  }

  input QueenFilter {
    name: String
    franchise: String
    isWinner: Boolean
    isMissCongeniality: Boolean
  }

  input SeasonFilter {
    franchise: String
    type: SeasonType
    year: Int
  }

  input QueenSort {
    field: QueenSortField!
    direction: SortDirection!
  }

  input PaginationInput {
    first: Int
    after: String
    last: Int
    before: String
  }

  input QueenUpdateInput {
    name: String
    legalName: String
    birthDate: String
    hometown: String
    socialMedia: SocialMediaInput
  }

  input SeasonUpdateInput {
    number: Int
    type: SeasonType
    franchise: String
    premiereDate: String
    finaleDate: String
  }

  input EpisodeUpdateInput {
    number: Int
    title: String
    airDate: String
  }

  input SocialMediaInput {
    instagram: String
    twitter: String
    tiktok: String
    website: String
  }

  enum SeasonType {
    REGULAR
    ALL_STARS
    UK
    INTERNATIONAL
  }

  enum ChallengeType {
    DESIGN
    PERFORMANCE
    IMPROV
    COMEDY
    ACTING
    SINGING
    DANCING
    MAKEUP
    OTHER
  }

  enum EliminationReason {
    LIP_SYNC
    DISQUALIFICATION
    QUIT
    OTHER
  }

  enum QueenSortField {
    NAME
    PLACEMENT
    CHALLENGE_WINS
    LIP_SYNC_WINS
  }

  enum SortDirection {
    ASC
    DESC
  }

  enum SearchType {
    QUEEN
    SEASON
    EPISODE
    ALL
  }
`;
