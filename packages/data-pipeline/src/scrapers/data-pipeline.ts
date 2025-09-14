import { QueenScraper } from './queen-scraper';
import { SeasonScraper } from './season-scraper';
import { EpisodeScraper } from './episode-scraper';

export class DataPipeline {
  private queenScraper: QueenScraper;
  private seasonScraper: SeasonScraper;
  private episodeScraper: EpisodeScraper;

  constructor() {
    this.queenScraper = new QueenScraper();
    this.seasonScraper = new SeasonScraper();
    this.episodeScraper = new EpisodeScraper();
  }

  async run(): Promise<void> {
    console.log('📊 Starting data collection...');

    try {
      // Scrape seasons first (they contain episode and queen references)
      console.log('📺 Scraping seasons...');
      const seasons = await this.seasonScraper.scrapeAllSeasons();
      console.log(`✅ Scraped ${seasons.length} seasons`);

      // Scrape queens
      console.log('👑 Scraping queens...');
      const queens = await this.queenScraper.scrapeAllQueens();
      console.log(`✅ Scraped ${queens.length} queens`);

      // Scrape episodes
      console.log('🎬 Scraping episodes...');
      const episodes = await this.episodeScraper.scrapeAllEpisodes();
      console.log(`✅ Scraped ${episodes.length} episodes`);

      console.log('🎉 Data collection completed successfully!');
    } catch (error) {
      console.error('❌ Data collection failed:', error);
      throw error;
    }
  }
}
