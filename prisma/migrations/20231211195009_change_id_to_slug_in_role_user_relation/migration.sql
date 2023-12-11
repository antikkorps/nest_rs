/*
  Warnings:

  - The primary key for the `RoleUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `RoleUser` table. All the data in the column will be lost.
  - Added the required column `roleSlug` to the `RoleUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoleUser" DROP CONSTRAINT "RoleUser_roleId_fkey";

-- AlterTable
ALTER TABLE "RoleUser" DROP CONSTRAINT "RoleUser_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "roleSlug" TEXT NOT NULL,
ADD CONSTRAINT "RoleUser_pkey" PRIMARY KEY ("userId", "roleSlug");

-- AddForeignKey
ALTER TABLE "RoleUser" ADD CONSTRAINT "RoleUser_roleSlug_fkey" FOREIGN KEY ("roleSlug") REFERENCES "Role"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
