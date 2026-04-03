/*
  Warnings:

  - The values [ORANGE,PURPLE,VIOLET,CYAN] on the enum `ProductColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductColor_new" AS ENUM ('BLACK', 'WHITE', 'GRAY', 'BLUE', 'GREEN', 'RED', 'YELLOW');
ALTER TABLE "ProductImage" ALTER COLUMN "color" TYPE "ProductColor_new" USING ("color"::text::"ProductColor_new");
ALTER TYPE "ProductColor" RENAME TO "ProductColor_old";
ALTER TYPE "ProductColor_new" RENAME TO "ProductColor";
DROP TYPE "public"."ProductColor_old";
COMMIT;
