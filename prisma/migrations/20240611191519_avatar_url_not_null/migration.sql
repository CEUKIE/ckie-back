/*
  Warnings:

  - Made the column `avatar_url` on table `cage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cage" ALTER COLUMN "avatar_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "cage_state" ALTER COLUMN "created_at" DROP DEFAULT;
