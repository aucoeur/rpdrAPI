import { Resolvers } from '../types/graphql';
import { QueenService } from '../services/queen.service';
import { SeasonService } from '../services/season.service';
import { EpisodeService } from '../services/episode.service';

// Initialize services
const queenService = new QueenService();
const seasonService = new SeasonService();
const episodeService = new EpisodeService();

export const resolvers: Resolvers = {
  Query: {
    queens: async (_, { filter, pagination, sort }) => {
      return await queenService.getQueens(filter, pagination, sort);
    },

    queen: async (_, { id, name }) => {
      if (id) {
        return await queenService.getQueenById(id);
      }
      if (name) {
        return await queenService.getQueenByName(name);
      }
      throw new Error('Either id or name must be provided');
    },

    seasons: async (_, { filter, pagination }) => {
      return await seasonService.getSeasons(filter, pagination);
    },

    season: async (_, { id, number, franchise }) => {
      if (id) {
        return await seasonService.getSeasonById(id);
      }
      if (number && franchise) {
        return await seasonService.getSeasonByNumberAndFranchise(number, franchise);
      }
      throw new Error('Either id or both number and franchise must be provided');
    },

    episodes: async (_, { seasonId, pagination }) => {
      return await episodeService.getEpisodesBySeason(seasonId, pagination);
    },

    episode: async (_, { id }) => {
      return await episodeService.getEpisodeById(id);
    },

    search: async (_, { query, type }) => {
      // TODO: Implement search functionality
      return {
        queens: [],
        seasons: [],
        episodes: [],
      };
    },
  },

  Mutation: {
    updateQueen: async (_, { id, input }) => {
      return await queenService.updateQueen(id, input);
    },

    updateSeason: async (_, { id, input }) => {
      return await seasonService.updateSeason(id, input);
    },

    updateEpisode: async (_, { id, input }) => {
      return await episodeService.updateEpisode(id, input);
    },
  },

  Subscription: {
    seasonUpdated: {
      subscribe: async function* (_, { seasonId }) {
        // TODO: Implement subscription functionality
        yield { seasonUpdated: null };
      },
    },

    newEpisode: {
      subscribe: async function* () {
        // TODO: Implement subscription functionality
        yield { newEpisode: null };
      },
    },
  },
};
