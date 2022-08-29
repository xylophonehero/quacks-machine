/*
  Warnings:

  - You are about to drop the column `machine` on the `Machine` table. All the data in the column will be lost.
  - Added the required column `seed` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "machine",
ADD COLUMN     "seed" TEXT NOT NULL;
