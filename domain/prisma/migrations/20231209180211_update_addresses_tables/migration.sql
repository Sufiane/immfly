/*
  Warnings:

  - Added the required column `city` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "additional_street" TEXT,
    "zip_code" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    CONSTRAINT "Addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Addresses" ("id", "user_id") SELECT "id", "user_id" FROM "Addresses";
DROP TABLE "Addresses";
ALTER TABLE "new_Addresses" RENAME TO "Addresses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
