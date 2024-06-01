#!/bin/sh

npx prisma migrate deploy --schema /usr/app/dist/prisma/schema.prisma
npx nestia swagger
node dist/src/main