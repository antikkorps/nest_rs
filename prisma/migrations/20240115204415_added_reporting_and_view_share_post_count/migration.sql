-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('POST', 'PROFILE', 'MEDIA', 'MESSAGE');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "shared" BIGINT,
ADD COLUMN     "views" BIGINT;

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "reportItemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
