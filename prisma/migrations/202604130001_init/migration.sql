-- CreateTable
CREATE TABLE "Avocat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "numeroBarreau" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reference" TEXT NOT NULL,
    "objet" TEXT NOT NULL,
    "dateOuverture" DATETIME NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'OUVERT',
    "avocatId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Dossier_avocatId_fkey" FOREIGN KEY ("avocatId") REFERENCES "Avocat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Dossier_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Audience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateHeure" DATETIME NOT NULL,
    "lieu" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'PLANIFIEE',
    "dossierId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Audience_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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

