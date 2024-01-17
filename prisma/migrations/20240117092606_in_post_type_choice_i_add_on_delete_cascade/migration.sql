-- DropForeignKey
ALTER TABLE "postContents" DROP CONSTRAINT "postContents_postTypeId_fkey";

-- AddForeignKey
ALTER TABLE "postContents" ADD CONSTRAINT "postContents_postTypeId_fkey" FOREIGN KEY ("postTypeId") REFERENCES "postTypeChoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
