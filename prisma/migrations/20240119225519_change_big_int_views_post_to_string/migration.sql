/*
  Warnings:

  - A unique constraint covering the columns `[postId,tagName]` on the table `postsTags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "views" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "PinnedPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PinnedPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "postsTags_postId_tagName_key" ON "postsTags"("postId", "tagName");

-- AddForeignKey
ALTER TABLE "PinnedPost" ADD CONSTRAINT "PinnedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinnedPost" ADD CONSTRAINT "PinnedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
