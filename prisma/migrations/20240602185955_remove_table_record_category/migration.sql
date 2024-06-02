/*
  Warnings:

  - You are about to drop the column `recordCategoryId` on the `record` table. All the data in the column will be lost.
  - You are about to drop the `record_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordCategory" AS ENUM ('FEEDING', 'WEIGHT', 'ECDYSIS', 'ETC');

-- DropForeignKey
ALTER TABLE "record" DROP CONSTRAINT "record_recordCategoryId_fkey";

-- AlterTable
ALTER TABLE "record" DROP COLUMN "recordCategoryId",
ADD COLUMN     "category" "RecordCategory" NOT NULL;

-- DropTable
DROP TABLE "record_category";
