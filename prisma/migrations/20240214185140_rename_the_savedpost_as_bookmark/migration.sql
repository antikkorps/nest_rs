/*
  Warnings:

  - You are about to drop the `savedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "savedPosts" DROP CONSTRAINT "savedPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "savedPosts" DROP CONSTRAINT "savedPosts_userId_fkey";

-- DropTable
DROP TABLE "savedPosts";

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_userId_postId_key" ON "bookmarks"("userId", "postId");

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
