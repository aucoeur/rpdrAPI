import { z } from 'zod';

// Base schemas
export const QueenSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  legalName: z.string().optional(),
  birthDate: z.date().optional(),
  hometown: z.string().optional(),
  socialMedia: z.object({
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    tiktok: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
  }),
  seasons: z.array(z.any()), // Will be properly typed later
  stats: z.any(), // Will be properly typed later
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SeasonSchema = z.object({
  id: z.string(),
  number: z.number().int().positive('Season number must be positive'),
  type: z.enum(['REGULAR', 'ALL_STARS', 'UK', 'INTERNATIONAL']),
  franchise: z.string().min(1, 'Franchise is required'),
  premiereDate: z.date(),
  finaleDate: z.date().optional(),
  episodes: z.array(z.any()), // Will be properly typed later
  queens: z.array(z.any()), // Will be properly typed later
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const EpisodeSchema = z.object({
  id: z.string(),
  seasonId: z.string(),
  number: z.number().int().positive('Episode number must be positive'),
  title: z.string().min(1, 'Title is required'),
  airDate: z.date(),
  challenges: z.array(z.any()), // Will be properly typed later
  eliminations: z.array(z.any()), // Will be properly typed later
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SeasonParticipationSchema = z.object({
  id: z.string(),
  queenId: z.string(),
  seasonId: z.string(),
  placement: z.number().int().positive('Placement must be positive'),
  episodeCount: z.number().int().min(0, 'Episode count cannot be negative'),
  challengeWins: z.number().int().min(0, 'Challenge wins cannot be negative'),
  lipSyncWins: z.number().int().min(0, 'Lip sync wins cannot be negative'),
  isWinner: z.boolean(),
  isMissCongeniality: z.boolean(),
});

export const QueenStatsSchema = z.object({
  totalSeasons: z.number().int().min(0),
  totalEpisodes: z.number().int().min(0),
  totalChallengeWins: z.number().int().min(0),
  totalLipSyncWins: z.number().int().min(0),
  averagePlacement: z.number().min(0),
  isWinner: z.boolean(),
  isMissCongeniality: z.boolean(),
});

export const ChallengeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Challenge name is required'),
  type: z.enum(['DESIGN', 'PERFORMANCE', 'IMPROV', 'COMEDY', 'ACTING', 'SINGING', 'DANCING', 'MAKEUP', 'OTHER']),
  description: z.string().optional(),
});

export const EliminationSchema = z.object({
  id: z.string(),
  queenId: z.string(),
  episodeId: z.string(),
  reason: z.enum(['LIP_SYNC', 'DISQUALIFICATION', 'QUIT', 'OTHER']),
  lipSyncSong: z.string().optional(),
  lipSyncOpponent: z.string().optional(),
});

// Input schemas for mutations
export const QueenUpdateInputSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  legalName: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  hometown: z.string().optional(),
  socialMedia: z.object({
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    tiktok: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
  }).optional(),
});

export const SeasonUpdateInputSchema = z.object({
  number: z.number().int().positive().optional(),
  type: z.enum(['REGULAR', 'ALL_STARS', 'UK', 'INTERNATIONAL']).optional(),
  franchise: z.string().min(1).optional(),
  premiereDate: z.string().datetime().optional(),
  finaleDate: z.string().datetime().optional(),
});

export const EpisodeUpdateInputSchema = z.object({
  number: z.number().int().positive().optional(),
  title: z.string().min(1).optional(),
  airDate: z.string().datetime().optional(),
});

// Filter schemas
export const QueenFilterSchema = z.object({
  name: z.string().optional(),
  franchise: z.string().optional(),
  isWinner: z.boolean().optional(),
  isMissCongeniality: z.boolean().optional(),
});

export const SeasonFilterSchema = z.object({
  franchise: z.string().optional(),
  type: z.enum(['REGULAR', 'ALL_STARS', 'UK', 'INTERNATIONAL']).optional(),
  year: z.number().int().min(2000).max(new Date().getFullYear()).optional(),
});

export const QueenSortSchema = z.object({
  field: z.enum(['NAME', 'PLACEMENT', 'CHALLENGE_WINS', 'LIP_SYNC_WINS']),
  direction: z.enum(['ASC', 'DESC']),
});

export const PaginationInputSchema = z.object({
  first: z.number().int().positive().max(100).optional(),
  after: z.string().optional(),
  last: z.number().int().positive().max(100).optional(),
  before: z.string().optional(),
});

// Search schemas
export const SearchInputSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['QUEEN', 'SEASON', 'EPISODE', 'ALL']).default('ALL'),
});

// Type exports for TypeScript
export type QueenInput = z.infer<typeof QueenSchema>;
export type SeasonInput = z.infer<typeof SeasonSchema>;
export type EpisodeInput = z.infer<typeof EpisodeSchema>;
export type QueenUpdateInput = z.infer<typeof QueenUpdateInputSchema>;
export type SeasonUpdateInput = z.infer<typeof SeasonUpdateInputSchema>;
export type EpisodeUpdateInput = z.infer<typeof EpisodeUpdateInputSchema>;
export type QueenFilter = z.infer<typeof QueenFilterSchema>;
export type SeasonFilter = z.infer<typeof SeasonFilterSchema>;
export type QueenSort = z.infer<typeof QueenSortSchema>;
export type PaginationInput = z.infer<typeof PaginationInputSchema>;
export type SearchInput = z.infer<typeof SearchInputSchema>;
