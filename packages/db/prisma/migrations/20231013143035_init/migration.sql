-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "profile_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isSubscribe" BOOLEAN,
    "isDeleted" BOOLEAN,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "remainder" BIGINT NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "plan" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceItems" (
    "id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "comment" TEXT,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "balance_id" INTEGER NOT NULL,
    "income_balance_id" INTEGER NOT NULL,

    CONSTRAINT "BalanceItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeItems" (
    "id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "income_id" INTEGER NOT NULL,
    "balance_id" INTEGER NOT NULL,

    CONSTRAINT "IncomeItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_profile_id_key" ON "Users"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_profile_id_key" ON "Balance"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_profile_id_key" ON "Category"("profile_id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceItems" ADD CONSTRAINT "BalanceItems_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceItems" ADD CONSTRAINT "BalanceItems_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceItems" ADD CONSTRAINT "BalanceItems_income_balance_id_fkey" FOREIGN KEY ("income_balance_id") REFERENCES "IncomeItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeItems" ADD CONSTRAINT "IncomeItems_income_id_fkey" FOREIGN KEY ("income_id") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeItems" ADD CONSTRAINT "IncomeItems_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
