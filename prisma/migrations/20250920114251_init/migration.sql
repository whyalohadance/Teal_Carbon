-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'DOCTOR', 'RECEPTION', 'CALLCENTER');

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "idnp" CHAR(13) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(9) NOT NULL,
    "gender" "public"."Gender" NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "role" "public"."Role" NOT NULL,
    "phone" VARCHAR(9) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Appointment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roomName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_idnp_key" ON "public"."Patient"("idnp");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "public"."Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_key" ON "public"."Patient"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_phone_key" ON "public"."Staff"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "public"."Staff"("email");

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
