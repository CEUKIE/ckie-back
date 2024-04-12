import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://ckie:pass@localhost:5431/ckie?schema=public',
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
    where: { name: '달팽이' },
    update: {},
    create: {
      name: '달팽이',
      minTemperature: 1.2,
      maxTemperature: 30.5,
      minHumidity: 20.2,
      maxHumidity: 60.7,
      individuals: {
        create: [
          {
            name: '퍙이',
            weight: 3.2,
            weightUnit: 'G',
            memo: '응가쟁이임',
            gender: 'FEMALE',
            hatchedAt: '2024-04-12T09:50:17.029Z',
            userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
          },
          {
            name: '풍이',
            weight: 56.2,
            weightUnit: 'G',
            memo: '똥쟁이임',
            gender: 'FEMALE',
            hatchedAt: '2024-04-12T09:50:17.029Z',
            userId: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
          },
        ],
      },
    },
  });

  console.log([user, species]);
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
