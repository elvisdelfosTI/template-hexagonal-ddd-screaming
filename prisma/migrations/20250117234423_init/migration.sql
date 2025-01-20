/*
  Warnings:

  - You are about to alter the column `publishedDate` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "pagesCount" INTEGER NOT NULL,
    "ISBN" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("ISBN", "authorId", "id", "pagesCount", "publishedDate", "title") SELECT "ISBN", "authorId", "id", "pagesCount", "publishedDate", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
