-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cart_has_product" (
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("cart_id", "product_id"),
    CONSTRAINT "cart_has_product_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cart_has_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cart_has_product" ("cart_id", "product_id", "quantity") SELECT "cart_id", "product_id", "quantity" FROM "cart_has_product";
DROP TABLE "cart_has_product";
ALTER TABLE "new_cart_has_product" RENAME TO "cart_has_product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
