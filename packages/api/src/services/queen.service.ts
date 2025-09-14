import { prisma } from '../lib/database';
import { 
  Queen, 
  QueenFilter, 
  QueenSort, 
  PaginationInput, 
  Connection,
  QueenUpdateInput 
} from '@shared/types';
import { createCursor, calculatePaginationInfo } from '@shared/utils';

export class QueenService {
  async getQueens(
    filter?: QueenFilter,
    pagination?: PaginationInput,
    sort?: QueenSort
  ): Promise<Connection<Queen>> {
    const { limit, offset } = this.normalizePagination(pagination);
    
    // Build where clause
    const where = this.buildWhereClause(filter);
    
    // Build orderBy clause
    const orderBy = this.buildOrderByClause(sort);
    
    // Get total count
    const totalCount = await prisma.queen.count({ where });
    
    // Get queens with pagination
    const queens = await prisma.queen.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        seasonParticipations: {
          include: {
            season: true,
          },
        },
      },
    });
    
    // Transform to GraphQL format
    const edges = queens.map(queen => ({
      node: this.transformQueen(queen),
      cursor: createCursor(queen.id),
    }));
    
    const pageInfo = calculatePaginationInfo(
      totalCount,
      pagination?.first,
      pagination?.after,
      pagination?.last,
      pagination?.before
    );
    
    return {
      edges,
      pageInfo,
      totalCount,
    };
  }

  async getQueenById(id: string): Promise<Queen | null> {
    const queen = await prisma.queen.findUnique({
      where: { id },
      include: {
        seasonParticipations: {
          include: {
            season: true,
          },
        },
      },
    });
    
    return queen ? this.transformQueen(queen) : null;
  }

  async getQueenByName(name: string): Promise<Queen | null> {
    const queen = await prisma.queen.findUnique({
      where: { name },
      include: {
        seasonParticipations: {
          include: {
            season: true,
          },
        },
      },
    });
    
    return queen ? this.transformQueen(queen) : null;
  }

  async updateQueen(id: string, input: QueenUpdateInput): Promise<Queen> {
    const updatedQueen = await prisma.queen.update({
      where: { id },
      data: {
        name: input.name,
        legalName: input.legalName,
        birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
        hometown: input.hometown,
        instagram: input.socialMedia?.instagram,
        twitter: input.socialMedia?.twitter,
        tiktok: input.socialMedia?.tiktok,
        website: input.socialMedia?.website,
      },
      include: {
        seasonParticipations: {
          include: {
            season: true,
          },
        },
      },
    });
    
    return this.transformQueen(updatedQueen);
  }

  async createQueen(input: Partial<Queen>): Promise<Queen> {
    const newQueen = await prisma.queen.create({
      data: {
        name: input.name!,
        legalName: input.legalName,
        birthDate: input.birthDate,
        hometown: input.hometown,
        instagram: input.socialMedia?.instagram,
        twitter: input.socialMedia?.twitter,
        tiktok: input.socialMedia?.tiktok,
        website: input.socialMedia?.website,
      },
      include: {
        seasonParticipations: {
          include: {
            season: true,
          },
        },
      },
    });
    
    return this.transformQueen(newQueen);
  }

  async deleteQueen(id: string): Promise<boolean> {
    try {
      await prisma.queen.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting queen:', error);
      return false;
    }
  }

  private normalizePagination(pagination?: PaginationInput) {
    const limit = pagination?.first || pagination?.last || 10;
    const offset = pagination?.after ? 1 : 0; // Simple offset for cursor-based pagination
    return { limit: Math.min(limit, 100), offset };
  }

  private buildWhereClause(filter?: QueenFilter) {
    if (!filter) return {};
    
    const where: any = {};
    
    if (filter.name) {
      where.name = {
        contains: filter.name,
        mode: 'insensitive',
      };
    }
    
    if (filter.franchise) {
      where.seasonParticipations = {
        some: {
          season: {
            franchise: filter.franchise,
          },
        },
      };
    }
    
    if (filter.isWinner !== undefined) {
      where.seasonParticipations = {
        some: {
          isWinner: filter.isWinner,
        },
      };
    }
    
    if (filter.isMissCongeniality !== undefined) {
      where.seasonParticipations = {
        some: {
          isMissCongeniality: filter.isMissCongeniality,
        },
      };
    }
    
    return where;
  }

  private buildOrderByClause(sort?: QueenSort) {
    if (!sort) return { name: 'asc' };
    
    const orderBy: any = {};
    
    switch (sort.field) {
      case 'NAME':
        orderBy.name = sort.direction.toLowerCase();
        break;
      case 'PLACEMENT':
        orderBy.seasonParticipations = {
          _count: sort.direction.toLowerCase(),
        };
        break;
      case 'CHALLENGE_WINS':
        orderBy.seasonParticipations = {
          _sum: {
            challengeWins: sort.direction.toLowerCase(),
          },
        };
        break;
      case 'LIP_SYNC_WINS':
        orderBy.seasonParticipations = {
          _sum: {
            lipSyncWins: sort.direction.toLowerCase(),
          },
        };
        break;
      default:
        orderBy.name = 'asc';
    }
    
    return orderBy;
  }

  private transformQueen(queen: any): Queen {
    const seasons = queen.seasonParticipations || [];
    const totalSeasons = seasons.length;
    const totalEpisodes = seasons.reduce((sum: number, sp: any) => sum + sp.episodeCount, 0);
    const totalChallengeWins = seasons.reduce((sum: number, sp: any) => sum + sp.challengeWins, 0);
    const totalLipSyncWins = seasons.reduce((sum: number, sp: any) => sum + sp.lipSyncWins, 0);
    const placements = seasons.map((sp: any) => sp.placement);
    const averagePlacement = placements.length > 0 
      ? placements.reduce((sum: number, p: number) => sum + p, 0) / placements.length 
      : 0;
    
    return {
      id: queen.id,
      name: queen.name,
      legalName: queen.legalName,
      birthDate: queen.birthDate,
      hometown: queen.hometown,
      socialMedia: {
        instagram: queen.instagram,
        twitter: queen.twitter,
        tiktok: queen.tiktok,
        website: queen.website,
      },
      seasons: seasons.map((sp: any) => ({
        id: sp.id,
        queenId: sp.queenId,
        seasonId: sp.seasonId,
        placement: sp.placement,
        episodeCount: sp.episodeCount,
        challengeWins: sp.challengeWins,
        lipSyncWins: sp.lipSyncWins,
        isWinner: sp.isWinner,
        isMissCongeniality: sp.isMissCongeniality,
      })),
      stats: {
        totalSeasons,
        totalEpisodes,
        totalChallengeWins,
        totalLipSyncWins,
        averagePlacement,
        isWinner: seasons.some((sp: any) => sp.isWinner),
        isMissCongeniality: seasons.some((sp: any) => sp.isMissCongeniality),
      },
      createdAt: queen.createdAt,
      updatedAt: queen.updatedAt,
    };
  }
}