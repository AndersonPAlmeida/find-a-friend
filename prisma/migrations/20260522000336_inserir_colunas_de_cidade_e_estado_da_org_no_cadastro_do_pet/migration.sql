/*
  Warnings:

  - Added the required column `cidade_org` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado_org` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "cidade_org" TEXT NOT NULL,
ADD COLUMN     "estado_org" TEXT NOT NULL;
