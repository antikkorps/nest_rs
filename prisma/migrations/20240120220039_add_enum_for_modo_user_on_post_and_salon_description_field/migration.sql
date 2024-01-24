-- CreateEnum
CREATE TYPE "ModoChoiceStatus" AS ENUM ('PENDING', 'VALIDATED', 'MODERATED');

-- CreateEnum
CREATE TYPE "UserChoiceStatus" AS ENUM ('DRAFT', 'ARCHIVED', 'PUBLISHED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "modo_status" "ModoChoiceStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "user_status" "UserChoiceStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "salons" ADD COLUMN     "description" TEXT;
