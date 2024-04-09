import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://ckie:pass@localhost:5431/ckie?schema=public',
});

async function main() {
  const user = await prisma.user.upsert({
    where: { identifier: 'test' },
    update: {},
    create: {
      identifier: 'test',
      nickname: 'snail',
      introduction: 'introduction..',
      platform: 'KAKAO',
    },
  });

  console.log(user);
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
