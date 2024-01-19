/*
  Warnings:

  - You are about to drop the column `likedItemId` on the `posts` table. All the data in the column will be lost.
  - The primary key for the `postsTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagSlug` on the `postsTags` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `tags` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `postsTags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_tagSlug_fkey";

-- DropIndex
DROP INDEX "tags_slug_key";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "likedItemId";

-- AlterTable
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_pkey",
DROP COLUMN "tagSlug",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "postsTags_pkey" PRIMARY KEY ("postId", "tagName");

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "slug";

-- AddForeignKey
ALTER TABLE "postsTags" ADD CONSTRAINT "postsTags_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "tags"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
