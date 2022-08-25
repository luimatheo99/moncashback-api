-- CreateTable
CREATE TABLE "users_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_codes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_codes" ADD CONSTRAINT "users_codes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
