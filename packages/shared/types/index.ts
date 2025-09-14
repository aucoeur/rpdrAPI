export interface Queen {
  id: string;
  name: string;
  legalName?: string;
  birthDate?: Date;
  hometown?: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
  };
  seasons: SeasonParticipation[];
  stats: QueenStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface Season {
  id: string;
  number: number;
  type: SeasonType;
  franchise: string;
  premiereDate: Date;
  finaleDate?: Date;
  episodes: Episode[];
  queens: SeasonParticipation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  id: string;
  seasonId: string;
  number: number;
  title: string;
  airDate: Date;
  challenges: Challenge[];
  eliminations: Elimination[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SeasonParticipation {
  id: string;
  queenId: string;
  seasonId: string;
  placement: number;
  episodeCount: number;
  challengeWins: number;
  lipSyncWins: number;
  isWinner: boolean;
  isMissCongeniality: boolean;
}

export interface QueenStats {
  totalSeasons: number;
  totalEpisodes: number;
  totalChallengeWins: number;
  totalLipSyncWins: number;
  averagePlacement: number;
  isWinner: boolean;
  isMissCongeniality: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  type: ChallengeType;
  description?: string;
}

export interface Elimination {
  id: string;
  queenId: string;
  episodeId: string;
  reason: EliminationReason;
  lipSyncSong?: string;
  lipSyncOpponent?: string;
}

export type SeasonType = 'REGULAR' | 'ALL_STARS' | 'UK' | 'INTERNATIONAL';
export type ChallengeType = 'DESIGN' | 'PERFORMANCE' | 'IMPROV' | 'COMEDY' | 'ACTING' | 'SINGING' | 'DANCING' | 'MAKEUP' | 'OTHER';
export type EliminationReason = 'LIP_SYNC' | 'DISQUALIFICATION' | 'QUIT' | 'OTHER';

export interface PaginationInput {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface PaginationInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Connection<T> {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: PaginationInfo;
  totalCount: number;
}

// GraphQL specific types
export interface QueenFilter {
  name?: string;
  franchise?: string;
  isWinner?: boolean;
  isMissCongeniality?: boolean;
}

export interface SeasonFilter {
  franchise?: string;
  type?: SeasonType;
  year?: number;
}

export interface QueenSort {
  field: QueenSortField;
  direction: SortDirection;
}

export type QueenSortField = 'NAME' | 'PLACEMENT' | 'CHALLENGE_WINS' | 'LIP_SYNC_WINS';
export type SortDirection = 'ASC' | 'DESC';
export type SearchType = 'QUEEN' | 'SEASON' | 'EPISODE' | 'ALL';

export interface SearchResults {
  queens: Queen[];
  seasons: Season[];
  episodes: Episode[];
}

// Input types for mutations
export interface QueenUpdateInput {
  name?: string;
  legalName?: string;
  birthDate?: string;
  hometown?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
  };
}

export interface SeasonUpdateInput {
  number?: number;
  type?: SeasonType;
  franchise?: string;
  premiereDate?: string;
  finaleDate?: string;
}

export interface EpisodeUpdateInput {
  number?: number;
  title?: string;
  airDate?: string;
}
