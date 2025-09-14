import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create seasons
  const season6 = await prisma.season.upsert({
    where: { number: 6 },
    update: {},
    create: {
      number: 6,
      type: 'REGULAR',
      franchise: 'US',
      premiereDate: new Date('2014-02-24'),
      finaleDate: new Date('2014-05-19'),
    },
  });

  const season7 = await prisma.season.upsert({
    where: { number: 7 },
    update: {},
    create: {
      number: 7,
      type: 'REGULAR',
      franchise: 'US',
      premiereDate: new Date('2015-03-02'),
      finaleDate: new Date('2015-06-01'),
    },
  });

  console.log('✅ Created seasons');

  // Create queens
  const bianca = await prisma.queen.upsert({
    where: { name: 'Bianca Del Rio' },
    update: {},
    create: {
      name: 'Bianca Del Rio',
      legalName: 'Roy Haylock',
      birthDate: new Date('1975-06-27'),
      hometown: 'New Orleans, Louisiana',
      instagram: 'https://instagram.com/thebiancadelrio',
      twitter: 'https://twitter.com/thebiancadelrio',
      website: 'https://biancadelrio.com',
    },
  });

  const violet = await prisma.queen.upsert({
    where: { name: 'Violet Chachki' },
    update: {},
    create: {
      name: 'Violet Chachki',
      legalName: 'Jason Dardo',
      birthDate: new Date('1992-06-13'),
      hometown: 'Atlanta, Georgia',
      instagram: 'https://instagram.com/violetchachki',
      twitter: 'https://twitter.com/violetchachki',
    },
  });

  const katya = await prisma.queen.upsert({
    where: { name: 'Katya Zamolodchikova' },
    update: {},
    create: {
      name: 'Katya Zamolodchikova',
      legalName: 'Brian McCook',
      birthDate: new Date('1982-05-01'),
      hometown: 'Boston, Massachusetts',
      instagram: 'https://instagram.com/katya_zamo',
      twitter: 'https://twitter.com/katya_zamo',
    },
  });

  console.log('✅ Created queens');

  // Create season participations
  await prisma.seasonParticipation.upsert({
    where: {
      queenId_seasonId: {
        queenId: bianca.id,
        seasonId: season6.id,
      },
    },
    update: {},
    create: {
      queenId: bianca.id,
      seasonId: season6.id,
      placement: 1,
      episodeCount: 10,
      challengeWins: 3,
      lipSyncWins: 0,
      isWinner: true,
      isMissCongeniality: false,
    },
  });

  await prisma.seasonParticipation.upsert({
    where: {
      queenId_seasonId: {
        queenId: violet.id,
        seasonId: season7.id,
      },
    },
    update: {},
    create: {
      queenId: violet.id,
      seasonId: season7.id,
      placement: 1,
      episodeCount: 10,
      challengeWins: 2,
      lipSyncWins: 0,
      isWinner: true,
      isMissCongeniality: false,
    },
  });

  await prisma.seasonParticipation.upsert({
    where: {
      queenId_seasonId: {
        queenId: katya.id,
        seasonId: season7.id,
      },
    },
    update: {},
    create: {
      queenId: katya.id,
      seasonId: season7.id,
      placement: 2,
      episodeCount: 10,
      challengeWins: 1,
      lipSyncWins: 2,
      isWinner: false,
      isMissCongeniality: true,
    },
  });

  console.log('✅ Created season participations');

  // Create episodes
  const episode1 = await prisma.episode.upsert({
    where: {
      seasonId_number: {
        seasonId: season6.id,
        number: 1,
      },
    },
    update: {},
    create: {
      seasonId: season6.id,
      number: 1,
      title: 'RuPaul\'s Big Opening',
      airDate: new Date('2014-02-24'),
    },
  });

  const episode2 = await prisma.episode.upsert({
    where: {
      seasonId_number: {
        seasonId: season6.id,
        number: 2,
      },
    },
    update: {},
    create: {
      seasonId: season6.id,
      number: 2,
      title: 'Scream Queens',
      airDate: new Date('2014-03-03'),
    },
  });

  console.log('✅ Created episodes');

  // Create challenges
  await prisma.challenge.upsert({
    where: { id: 'challenge-1' },
    update: {},
    create: {
      id: 'challenge-1',
      episodeId: episode1.id,
      name: 'RuPaul\'s Big Opening',
      type: 'PERFORMANCE',
      description: 'The queens perform in a talent show',
    },
  });

  await prisma.challenge.upsert({
    where: { id: 'challenge-2' },
    update: {},
    create: {
      id: 'challenge-2',
      episodeId: episode2.id,
      name: 'Scream Queens',
      type: 'ACTING',
      description: 'The queens act in horror movie parodies',
    },
  });

  console.log('✅ Created challenges');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
