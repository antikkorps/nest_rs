/*
  Warnings:

  - You are about to drop the column `emojiId` on the `instant_messages` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `instant_messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "instant_messages" DROP CONSTRAINT "instant_messages_emojiId_fkey";

-- AlterTable
ALTER TABLE "instant_messages" DROP COLUMN "emojiId",
DROP COLUMN "message";

-- CreateTable
CREATE TABLE "MessageContent" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instantMessageId" INTEGER NOT NULL,

    CONSTRAINT "MessageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextContent" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "messageContentId" INTEGER NOT NULL,

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiContent" (
    "emojiId" INTEGER NOT NULL,
    "messageContentId" INTEGER NOT NULL,

    CONSTRAINT "EmojiContent_pkey" PRIMARY KEY ("emojiId","messageContentId")
);

-- AddForeignKey
ALTER TABLE "MessageContent" ADD CONSTRAINT "MessageContent_instantMessageId_fkey" FOREIGN KEY ("instantMessageId") REFERENCES "instant_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextContent" ADD CONSTRAINT "TextContent_messageContentId_fkey" FOREIGN KEY ("messageContentId") REFERENCES "MessageContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiContent" ADD CONSTRAINT "EmojiContent_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "emojis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiContent" ADD CONSTRAINT "EmojiContent_messageContentId_fkey" FOREIGN KEY ("messageContentId") REFERENCES "MessageContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
