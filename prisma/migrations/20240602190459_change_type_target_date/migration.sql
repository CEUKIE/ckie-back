/*
  Warnings:

  - You are about to drop the column `targetDatetime` on the `record` table. All the data in the column will be lost.
  - Added the required column `targetDate` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "record" DROP COLUMN "targetDatetime",
ADD COLUMN     "targetDate" DATE NOT NULL;
