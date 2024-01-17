-- DropForeignKey
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_postId_fkey";

-- AddForeignKey
ALTER TABLE "postsTags" ADD CONSTRAINT "postsTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
