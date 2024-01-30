/*
  Warnings:

  - The primary key for the `pinnedPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "pinnedPosts" DROP CONSTRAINT "pinnedPosts_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pinnedPosts_pkey" PRIMARY KEY ("id");
