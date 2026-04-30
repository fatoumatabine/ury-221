-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "DossierStatut" AS ENUM ('OUVERT', 'EN_COURS', 'CLOS', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "AudienceStatut" AS ENUM ('PLANIFIEE', 'REPORTEE', 'TERMINEE');

-- CreateTable
CREATE TABLE "Avocat" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "numeroBarreau" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avocat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "objet" TEXT NOT NULL,
    "dateOuverture" TIMESTAMP(3) NOT NULL,
    "statut" "DossierStatut" NOT NULL DEFAULT 'OUVERT',
    "avocatId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audience" (
    "id" SERIAL NOT NULL,
    "dateHeure" TIMESTAMP(3) NOT NULL,
    "lieu" TEXT NOT NULL,
    "statut" "AudienceStatut" NOT NULL DEFAULT 'PLANIFIEE',
    "dossierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avocat_numeroBarreau_key" ON "Avocat"("numeroBarreau");

-- CreateIndex
CREATE UNIQUE INDEX "Avocat_email_key" ON "Avocat"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_reference_key" ON "Dossier"("reference");

-- CreateIndex
CREATE INDEX "Dossier_avocatId_idx" ON "Dossier"("avocatId");

-- CreateIndex
CREATE INDEX "Dossier_clientId_idx" ON "Dossier"("clientId");

-- CreateIndex
CREATE INDEX "Dossier_statut_idx" ON "Dossier"("statut");

-- CreateIndex
CREATE INDEX "Audience_dossierId_idx" ON "Audience"("dossierId");

-- CreateIndex
CREATE INDEX "Audience_dateHeure_idx" ON "Audience"("dateHeure");

-- CreateIndex
CREATE INDEX "Audience_statut_idx" ON "Audience"("statut");

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_avocatId_fkey" FOREIGN KEY ("avocatId") REFERENCES "Avocat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audience" ADD CONSTRAINT "Audience_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
