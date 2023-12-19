/*
  Warnings:

  - The `status` column on the `bannerImages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `profileImages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ImageStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BannerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "bannerImages" DROP COLUMN "status",
ADD COLUMN     "status" "BannerStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "profileImages" DROP COLUMN "status",
ADD COLUMN     "status" "ImageStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "main_post_index" ON "posts"("userId", "id");

-- CreateIndex
CREATE INDEX "main_user_index" ON "users"("firstName", "lastName", "email");
