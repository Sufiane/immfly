-- CreateTable
CREATE TABLE "Carts" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cart_has_product" (
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("cart_id", "product_id"),
    CONSTRAINT "cart_has_product_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cart_has_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
