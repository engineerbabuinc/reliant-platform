-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "valueCr" REAL NOT NULL DEFAULT 0,
    "owner" TEXT NOT NULL,
    "hot" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PipelineStage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stage" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "valueCr" REAL NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "opened" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "IssueComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IssueComment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "util" INTEGER NOT NULL DEFAULT 0,
    "dealsActive" INTEGER NOT NULL DEFAULT 0,
    "gciYtdCr" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "LandParcel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "acres" REAL NOT NULL,
    "fsi" REAL NOT NULL,
    "zoning" TEXT NOT NULL,
    "askCrPerAcre" REAL NOT NULL,
    "roadFt" INTEGER NOT NULL,
    "airportKm" INTEGER NOT NULL,
    "railKm" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "PipelineStage_stage_key" ON "PipelineStage"("stage");
