/*
  Warnings:

  - You are about to drop the column `role` on the `orgs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
