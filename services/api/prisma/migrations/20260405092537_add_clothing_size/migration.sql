/*
  Warnings:

  - You are about to drop the column `shirtSize` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ClothingSize" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "shirtSize",
ADD COLUMN     "clothingSize" "ClothingSize";

-- DropEnum
DROP TYPE "ShirtSize";
