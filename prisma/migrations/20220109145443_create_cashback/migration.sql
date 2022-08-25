-- CreateTable
CREATE TABLE "cashbacks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "id_company" TEXT NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cashbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cashbacks" ADD CONSTRAINT "cashbacks_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
