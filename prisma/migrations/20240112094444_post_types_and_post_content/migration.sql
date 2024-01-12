/*
  Warnings:

  - The `sex` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'DO_NOT_WANT_TO_SAY');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('MEDIA', 'TEXT', 'SHAREDPOST', 'SHAREDPROFILE', 'SHAREDMEDIA');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex";

-- CreateTable
CREATE TABLE "postTypeChoices" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "type" "PostType" NOT NULL,

    CONSTRAINT "postTypeChoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postContents" (
    "id" SERIAL NOT NULL,
    "postTypeId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "postContents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postTypeChoices" ADD CONSTRAINT "postTypeChoices_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postContents" ADD CONSTRAINT "postContents_postTypeId_fkey" FOREIGN KEY ("postTypeId") REFERENCES "postTypeChoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
