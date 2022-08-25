/*
  Warnings:

  - You are about to drop the column `password` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_company" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partners_email_key" ON "partners"("email");

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
