-- CreateTable
CREATE TABLE "transactions_items" (
    "id" TEXT NOT NULL,
    "id_transaction" TEXT NOT NULL,
    "id_cashback" TEXT,
    "earned_value" DECIMAL(65,30),
    "pay_value" DECIMAL(65,30),
    "item_value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "transactions_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_id_transaction_fkey" FOREIGN KEY ("id_transaction") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_id_cashback_fkey" FOREIGN KEY ("id_cashback") REFERENCES "cashbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
