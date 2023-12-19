/*
  Warnings:

  - You are about to drop the column `emoji` on the `instant_messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "instant_messages" DROP COLUMN "emoji",
ADD COLUMN     "emojiId" INTEGER;

-- CreateTable
CREATE TABLE "emojis" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "emojis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emojis_name_key" ON "emojis"("name");

-- CreateIndex
CREATE UNIQUE INDEX "emojis_slug_key" ON "emojis"("slug");

-- CreateIndex
CREATE INDEX "main_emoji_index" ON "emojis"("name", "slug");

-- AddForeignKey
ALTER TABLE "instant_messages" ADD CONSTRAINT "instant_messages_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "emojis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
