/*
  Warnings:

  - Added the required column `overallFeedback` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeAnalysis" ADD COLUMN     "analyzedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "overallFeedback" TEXT NOT NULL;
