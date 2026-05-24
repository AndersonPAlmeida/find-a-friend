/*
  Warnings:

  - The values [GRANDE] on the enum `Idade` will be removed. If these variants are still used in the database, this will fail.
  - The values [IDOSO] on the enum `Tamanho` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VISITOR');

-- AlterEnum
BEGIN;
CREATE TYPE "Idade_new" AS ENUM ('FILHOTE', 'ADULTO', 'IDOSO');
ALTER TABLE "pets" ALTER COLUMN "idade" TYPE "Idade_new" USING ("idade"::text::"Idade_new");
ALTER TYPE "Idade" RENAME TO "Idade_old";
ALTER TYPE "Idade_new" RENAME TO "Idade";
DROP TYPE "public"."Idade_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Tamanho_new" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');
ALTER TABLE "pets" ALTER COLUMN "tamanho" TYPE "Tamanho_new" USING ("tamanho"::text::"Tamanho_new");
ALTER TYPE "Tamanho" RENAME TO "Tamanho_old";
ALTER TYPE "Tamanho_new" RENAME TO "Tamanho";
DROP TYPE "public"."Tamanho_old";
COMMIT;

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VISITOR';
