/*
  Warnings:

  - You are about to drop the column `content` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Book` table. All the data in the column will be lost.
  - Added the required column `age` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ISBN` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagesCount` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);
INSERT INTO "new_Author" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "publishedDate" BOOLEAN NOT NULL DEFAULT true,
    "pagesCount" INTEGER NOT NULL,
    "ISBN" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("authorId", "id", "title") SELECT "authorId", "id", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
