-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_company" TEXT NOT NULL,
    "earned_value" DECIMAL(65,30),
    "pay_value" DECIMAL(65,30),
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
