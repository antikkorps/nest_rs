/*
  Warnings:

  - The `shared` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `views` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `repost` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "shared",
ADD COLUMN     "shared" INTEGER,
DROP COLUMN "views",
ADD COLUMN     "views" INTEGER,
DROP COLUMN "repost",
ADD COLUMN     "repost" INTEGER;
