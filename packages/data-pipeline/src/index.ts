import { DataPipeline } from './scrapers/data-pipeline';

async function main() {
  console.log('🚀 Starting RuPaul\'s Drag Race Data Pipeline...');

  const pipeline = new DataPipeline();

  try {
    await pipeline.run();
    console.log('✅ Data pipeline completed successfully');
  } catch (error) {
    console.error('❌ Data pipeline failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
