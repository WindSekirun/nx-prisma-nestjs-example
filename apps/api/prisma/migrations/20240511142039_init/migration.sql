/*
  Warnings:

  - You are about to drop the column `log` on the `BuildLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BuildLog" DROP COLUMN "log";

-- CreateTable
CREATE TABLE "BuildLogChunk" (
    "id" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "logContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buildLogId" TEXT NOT NULL,

    CONSTRAINT "BuildLogChunk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_buildLog_chunkIndex" ON "BuildLogChunk"("buildLogId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "BuildLogChunk" ADD CONSTRAINT "BuildLogChunk_buildLogId_fkey" FOREIGN KEY ("buildLogId") REFERENCES "BuildLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
