-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'PATIENT';

-- AlterTable
ALTER TABLE "public"."Patient" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0;
