import type { BookSaveDTO } from '@book/application/UsesCases/BookSave/BookSaveDTO';
import { BookISBN } from '@book/domain/BookISBN';
import { BookId } from '@book/domain/BookId';
import { BookAuthorId } from '@book/domain/BookIdAuthorId';
import { BookPagesCount } from '@book/domain/BookPagesCount';
import { BookPublishedDate } from '@book/domain/BookPublishDate';
import type { IBookRepository } from '@book/domain/BookRepository';
import { BookTitle } from '@book/domain/BookTitle';
import { Book as BookEntity } from '@book/domain/entities/Book';
import { log } from '@config/Logger.config';
import { db } from '@config/database/drizzle/drizzle';
import { eq } from 'drizzle-orm';
import { book as BookTable } from '../../../../../drizzle/schema';
export class DrizzleBookRepository implements IBookRepository {
  async save(book: BookEntity): Promise<void> {
    await db.insert(BookTable).values({
      id: book.id.value,
      title: book.title.value,
      publishedDate: new Date(book.publishedDate.value).toDateString(),
      pagesCount: book.pagesCount.value,
      isbn: book.ISBN.value,
      authorId: book.authorId.value,
      updatedAt: new Date().toDateString(),
    });
  }
  async getAll(): Promise<BookEntity[]> {
    console.log('getAll book');
    const books = await db.query.book.findMany();
    return books.map(
      (book: Record<string, unknown>) =>
        new BookEntity(
          new BookId(book.id as number),
          new BookTitle(book.title as string),
          new BookPublishedDate(new Date(book.publishedDate as string)),
          new BookPagesCount(book.pagesCount as number),
          new BookISBN(book.isbn as string),
          new BookAuthorId(book.authorId as number),
        ),
    );
  }

  async edit(book: BookSaveDTO): Promise<BookEntity | undefined> {
    const result = await db
      .update(BookTable)
      .set({
        title: book.title,
        publishedDate: new Date(book.publishedDate).toISOString(),
        pagesCount: book.pagesCount,
        isbn: book.ISBN,
        authorId: book.authorId,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(BookTable.id, book.id))
      .returning();

    if (!result[0]) return undefined;

    return new BookEntity(
      new BookId(result[0].id),
      new BookTitle(result[0].title),
      new BookPublishedDate(new Date(result[0].publishedDate)),
      new BookPagesCount(result[0].pagesCount),
      new BookISBN(result[0].isbn),
      new BookAuthorId(result[0].authorId),
    );
  }

  async getById(id: BookId): Promise<BookEntity | undefined> {
    const book = await db.query.book.findFirst({
      where: eq(BookTable.id, id.value),
    });
    return book
      ? new BookEntity(
          new BookId(book.id),
          new BookTitle(book.title),
          new BookPublishedDate(new Date(book.publishedDate as string)),
          new BookPagesCount(book.pagesCount),
          new BookISBN(book.isbn),
          new BookAuthorId(book.authorId),
        )
      : undefined;
  }
  async delete(id: BookId): Promise<BookEntity | undefined> {
    await db.delete(BookTable).where(eq(BookTable.id, id.value));
    return undefined;
  }
}
