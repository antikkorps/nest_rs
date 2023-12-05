/*
  Warnings:

  - You are about to drop the column `AnnonceId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `featuredImage` on the `Image` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Made the column `url` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "AnnonceId",
DROP COLUMN "featuredImage",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "url" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" TIMESTAMP(3),
ADD COLUMN     "sex" TEXT;

-- CreateTable
CREATE TABLE "SubscriptionUser" (
    "id" SERIAL NOT NULL,
    "since_month" TEXT,
    "billing_start_date" TIMESTAMP(3),
    "billing_end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "billing_next_date" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "street" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authorization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Authorization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorizationRole" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "authorizationId" INTEGER NOT NULL,

    CONSTRAINT "AuthorizationRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorizationSubscription" (
    "id" SERIAL NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "authorizationId" INTEGER NOT NULL,

    CONSTRAINT "AuthorizationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_name_key" ON "Subscription"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_slug_key" ON "Subscription"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_slug_key" ON "Role"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Authorization_name_key" ON "Authorization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Authorization_slug_key" ON "Authorization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizationRole_roleId_authorizationId_key" ON "AuthorizationRole"("roleId", "authorizationId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizationSubscription_subscriptionId_authorizationId_key" ON "AuthorizationSubscription"("subscriptionId", "authorizationId");

-- AddForeignKey
ALTER TABLE "SubscriptionUser" ADD CONSTRAINT "SubscriptionUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionUser" ADD CONSTRAINT "SubscriptionUser_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salon" ADD CONSTRAINT "Salon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRole" ADD CONSTRAINT "AuthorizationRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationRole" ADD CONSTRAINT "AuthorizationRole_authorizationId_fkey" FOREIGN KEY ("authorizationId") REFERENCES "Authorization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationSubscription" ADD CONSTRAINT "AuthorizationSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizationSubscription" ADD CONSTRAINT "AuthorizationSubscription_authorizationId_fkey" FOREIGN KEY ("authorizationId") REFERENCES "Authorization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
