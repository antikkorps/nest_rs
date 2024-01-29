/*
  Warnings:

  - The primary key for the `postsTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `postsTags` table. All the data in the column will be lost.
  - You are about to drop the `PinnedPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `tagName` on table `postsTags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PinnedPost" DROP CONSTRAINT "PinnedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "PinnedPost" DROP CONSTRAINT "PinnedPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_likedItemId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_tagName_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_pkey",
DROP COLUMN "id",
ALTER COLUMN "tagName" SET NOT NULL,
ADD CONSTRAINT "postsTags_pkey" PRIMARY KEY ("postId", "tagName");

-- DropTable
DROP TABLE "PinnedPost";

-- CreateTable
CREATE TABLE "pinnedPosts" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pinnedPosts_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "pinnedPosts" ADD CONSTRAINT "pinnedPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinnedPosts" ADD CONSTRAINT "pinnedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsTags" ADD CONSTRAINT "postsTags_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "tags"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likedItemId_fkey" FOREIGN KEY ("likedItemId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
