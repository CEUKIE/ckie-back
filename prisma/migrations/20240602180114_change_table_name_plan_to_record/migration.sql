/*
  Warnings:

  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_individualId_fkey";

-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_planCategoryId_fkey";

-- DropTable
DROP TABLE "plan";

-- DropTable
DROP TABLE "plan_category";

-- CreateTable
CREATE TABLE "record" (
    "id" TEXT NOT NULL,
    "targetDatetime" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "recordCategoryId" TEXT NOT NULL,
    "individualId" TEXT NOT NULL,

    CONSTRAINT "record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "colorHex" VARCHAR(7) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "record_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_recordCategoryId_fkey" FOREIGN KEY ("recordCategoryId") REFERENCES "record_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
