/*
  Warnings:

  - You are about to drop the column `age` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "age";

-- AlterTable
ALTER TABLE "public"."Staff" DROP COLUMN "age";
