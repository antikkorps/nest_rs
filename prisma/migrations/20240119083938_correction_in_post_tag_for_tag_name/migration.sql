/*
  Warnings:

  - The primary key for the `postsTags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_tagName_fkey";

-- AlterTable
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_pkey",
ALTER COLUMN "tagName" DROP NOT NULL,
ADD CONSTRAINT "postsTags_pkey" PRIMARY KEY ("postId");

-- AddForeignKey
ALTER TABLE "postsTags" ADD CONSTRAINT "postsTags_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "tags"("name") ON DELETE SET NULL ON UPDATE CASCADE;
