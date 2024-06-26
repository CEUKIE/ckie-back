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
    where: { id: '55475ad3-c152-484e-b50d-5bf38fe8b496' },
    update: {},
    create: {
      id: '55475ad3-c152-484e-b50d-5bf38fe8b496',
      name: '초코 사육장',
      userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
      avatarUrl: 'test',
    },
  });

  const cage2 = await prisma.cage.upsert({
    where: { id: 'c6bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f' },
    update: {},
    create: {
      id: 'c6bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
      name: '달팽이 사육장',
      userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
      avatarUrl: 'test',
    },
  });

  const cage3 = await prisma.cage.upsert({
    where: { id: 'c5bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f' },
    update: {},
    create: {
      id: 'c5bfa6a7-ebdd-4a2b-aadb-1bc9644a6b5f',
      name: '스네일 사육장',
      userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
      avatarUrl: 'test',
    },
  });

  const state1 = await prisma.cageState.upsert({
    where: { id: 'cf7fbf85-2a72-4f7b-a2dd-9ff92531a751' },
    update: {},
    create: {
      id: 'cf7fbf85-2a72-4f7b-a2dd-9ff92531a751',
      temperature: 25,
      humidity: 61.2,

      cageId: '55475ad3-c152-484e-b50d-5bf38fe8b496',
    },
  });

  const state2 = await prisma.cageState.upsert({
    where: { id: 'df7fbf85-2a72-4f7b-a2dd-9ff92531a751' },
    update: {},
    create: {
      id: 'df7fbf85-2a72-4f7b-a2dd-9ff92531a751',
      temperature: 26,
      humidity: 62.2,

      cageId: '55475ad3-c152-484e-b50d-5bf38fe8b496',
    },
  });

  const state3 = await prisma.cageState.upsert({
    where: { id: 'cf7dbf85-2a72-4f7b-a2dd-9ff92531a751' },
    update: {},
    create: {
      id: 'cf7dbf85-2a72-4f7b-a2dd-9ff92531a751',
      temperature: 28,
      humidity: 63.2,

      cageId: '55475ad3-c152-484e-b50d-5bf38fe8b496',
    },
  });

  const state4 = await prisma.cageState.upsert({
    where: { id: 'cf7dbf85-2a72-4f7b-a2dd-9ff92531a752' },
    update: {},
    create: {
      id: 'cf7dbf85-2a72-4f7b-a2dd-9ff92531a752',
      temperature: 30,
      humidity: 66.4,

      cageId: '55475ad3-c152-484e-b50d-5bf38fe8b496',
    },
  });

  const record1 = await prisma.record.upsert({
    where: { id: '919b83a4-fdc9-4d8e-804e-fce7199c118n' },
    update: {},
    create: {
      id: '919b83a4-fdc9-4d8e-804e-fce7199c118n',
      category: 'FEEDING',
      targetDate: new Date('2024-05-23'),
      individualId: '919b83a4-fdc9-4d8e-804e-fce7199c118a',
      memo: '귀뚜라미/중',
    },
  });

  const record2 = await prisma.record.upsert({
    where: { id: '519b83a4-fdc9-4d8e-804e-fce7199c118n' },
    update: {},
    create: {
      id: '519b83a4-fdc9-4d8e-804e-fce7199c118n',
      category: 'WEIGHT',
      weight: 5.2,
      targetDate: new Date('2024-05-23'),
      individualId: '919b83a4-fdc9-4d8e-804e-fce7199c118a',
    },
  });

  const record3 = await prisma.record.upsert({
    where: { id: '919b83a4-fdc9-4d8e-804e-fce7199c116n' },
    update: {},
    create: {
      id: '919b83a4-fdc9-4d8e-804e-fce7199c116n',
      category: 'WEIGHT',
      weight: 5.8,
      targetDate: new Date('2024-05-23'),
      individualId: '919b83a4-fdc9-4d8e-804e-fce7199c118a',
    },
  });

  const record4 = await prisma.record.upsert({
    where: { id: '919b83a4-fdc9-4d8e-804e-fce7199c118h' },
    update: {},
    create: {
      id: '919b83a4-fdc9-4d8e-804e-fce7199c118h',
      category: 'WEIGHT',
      weight: 6,
      targetDate: new Date('2024-05-23'),
      individualId: '919b83a4-fdc9-4d8e-804e-fce7199c118a',
    },
  });

  const record5 = await prisma.record.upsert({
    where: { id: '919b83a4-fdc9-4d8e-504e-fce7199c118n' },
    update: {},
    create: {
      id: '919b83a4-fdc9-4d8e-504e-fce7199c118n',
      category: 'WEIGHT',
      weight: 7,
      targetDate: new Date('2024-05-23'),
      individualId: '919b83a4-fdc9-4d8e-804e-fce7199c118a',
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
    state1,
    state2,
    state3,
    state4,
    record1,
    record2,
    record3,
    record4,
    record5,
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
