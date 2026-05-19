-- CreateEnum
CREATE TYPE "Idade" AS ENUM ('FILHOTE', 'ADULTO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Tamanho" AS ENUM ('PEQUENO', 'MEDIO', 'IDOSO');

-- CreateEnum
CREATE TYPE "Nivel_Energia" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "Independencia" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "Ambiente" AS ENUM ('INTERIOR', 'EXTERIOR', 'AMBOS');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "cep" VARCHAR(10) NOT NULL,
    "endereco_rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" "Idade" NOT NULL,
    "tamanho" "Tamanho" NOT NULL,
    "nivel_energia" "Nivel_Energia" NOT NULL,
    "independencia" "Independencia" NOT NULL,
    "ambiente" "Ambiente" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orgs_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_whatsapp_key" ON "orgs"("whatsapp");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgs_id_fkey" FOREIGN KEY ("orgs_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
