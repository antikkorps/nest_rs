/*
  Warnings:

  - The primary key for the `postsTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `postsTags` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "postsTags_postId_tagSlug_key";

-- AlterTable
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "postsTags_pkey" PRIMARY KEY ("postId", "tagSlug");
