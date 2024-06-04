-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('KAKAO', 'GOOGLE', 'NAVER');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('G', 'KG');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'LESS');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "nickname" VARCHAR(15) NOT NULL,
    "avatar_url" TEXT,
    "platform" "Platform" NOT NULL,
    "introduction" TEXT,
    "deleted" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "weight_unit" "WeightUnit" NOT NULL,
    "memo" VARCHAR(50),
    "gender" "Gender" NOT NULL,
    "deleted" TIMESTAMP(3),
    "hatched_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "cageId" TEXT,

    CONSTRAINT "individual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual_image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "individualId" TEXT NOT NULL,

    CONSTRAINT "individual_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "min_temperature" DOUBLE PRECISION NOT NULL,
    "max_temperature" DOUBLE PRECISION NOT NULL,
    "min_humidity" DOUBLE PRECISION NOT NULL,
    "max_humidity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "targetDatetime" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "planCategoryId" TEXT NOT NULL,
    "individualId" TEXT NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "colorHex" VARCHAR(7) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cage" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cage_state" (
    "id" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cageId" TEXT NOT NULL,

    CONSTRAINT "cage_state_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_identifier_key" ON "user"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "species_name_key" ON "species"("name");

-- AddForeignKey
ALTER TABLE "individual" ADD CONSTRAINT "individual_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual" ADD CONSTRAINT "individual_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual" ADD CONSTRAINT "individual_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual_image" ADD CONSTRAINT "individual_image_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_planCategoryId_fkey" FOREIGN KEY ("planCategoryId") REFERENCES "plan_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cage" ADD CONSTRAINT "cage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cage_state" ADD CONSTRAINT "cage_state_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
