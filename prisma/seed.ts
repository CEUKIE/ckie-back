import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://ckie:pass@localhost:5430/ckie?schema=public',
});

async function main() {
  const user = await prisma.user.upsert({
    where: { identifier: 'test' },
    update: {},
    create: {
      id: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
      identifier: 'test',
      nickname: 'snail',
      introduction: 'introduction..',
      platform: 'KAKAO',
    },
  });

  const species = await prisma.species.upsert({
    where: { id: 'c5bfa6a7-ebdd-4a2b-aadb-1bc9644a6b0f' },
    update: {},
    create: {
      id: 'c5bfa6a7-ebdd-4a2b-aadb-1bc9644a6b0f',
      minTemperature: 24,
      maxTemperature: 28,
      minHumidity: 50,
      maxHumidity: 70,
      name: '크레스티드 게코',
    },
  });

  const individual1 = await prisma.individual.upsert({
    where: { id: '919b83a4-fdc9-4d8e-804e-fce7199c118a' },
    update: {},
    create: {
      id: '919b83a4-fdc9-4d8e-804e-fce7199c118a',
      name: '퍙이',
      avatarUrl: 'https://image.ckie.store/images/individual-profile.jpeg',
      weight: 3.2,
      weightUnit: 'G',
      memo: '응가쟁이임',
      gender: 'FEMALE',
      hatchedAt: '2024-04-12T09:50:17.029Z',
      userId: user.id,
      speciesId: species.id,
    },
  });

  const individual2 = await prisma.individual.upsert({
    where: { id: 'c3bfa6a7-ebdd-4a2b-aadb-1bc9644a6b2f' },
    update: {},
    create: {
      id: 'c3bfa6a7-ebdd-4a2b-aadb-1bc9644a6b2f',
      name: '퐁이',
      avatarUrl: 'https://image.ckie.store/images/individual-profile.jpeg',
      weight: 3.2,
      weightUnit: 'G',
      memo: '응가쟁이임',
      gender: 'FEMALE',
      hatchedAt: '2024-04-12T09:50:17.029Z',
      userId: user.id,
      speciesId: species.id,
    },
  });

  const individual3 = await prisma.individual.upsert({
    where: { id: '8114792a-f375-496c-9e7a-dcf72837fdfd' },
    update: {},
    create: {
      id: '8114792a-f375-496c-9e7a-dcf72837fdfd',
      name: '풍이',
      avatarUrl: 'https://image.ckie.store/images/individual-profile.jpeg',
      weight: 56.2,
      weightUnit: 'G',
      memo: '똥쟁이임',
      gender: 'FEMALE',
      hatchedAt: '2024-04-12T09:50:17.029Z',
      userId: user.id,
      speciesId: species.id,
    },
  });

  const cage1 = await prisma.cage.upsert({
    where: { id: 'c3bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f' },
    update: {},
    create: {
      id: 'c3bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
      name: '코따리 사육장',
      userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
    },
  });

  const cage2 = await prisma.cage.upsert({
    where: { id: 'c6bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f' },
    update: {},
    create: {
      id: 'c6bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
      name: '달팽이 사육장',
      userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
    },
  });

  const cage3 = await prisma.cage.upsert({
    where: { id: 'c5bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f' },
    update: {},
    create: {
      id: 'c5bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
      name: '스네일 사육장',
      userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
    },
  });

  console.log([
    user,
    species,
    individual1,
    individual2,
    individual3,
    cage1,
    cage2,
    cage3,
  ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
