-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "site_url" TEXT,
    "logo" TEXT,
    "id_category" TEXT NOT NULL,
    "id_state" TEXT NOT NULL,
    "id_city" TEXT NOT NULL,
    "district" TEXT,
    "street" TEXT,
    "number" INTEGER,
    "maximum_redeption_limit_perc" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_phone_key" ON "companies"("phone");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
