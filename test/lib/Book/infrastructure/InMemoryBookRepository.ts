import { BookSaveDTO } from '../../../../src/lib/Book/application/UsesCases/BookSave/BookSaveDTO';
import { BookTitle } from '../../../../src/lib/Book/domain/BookTitle';
import { BookPublishedDate } from '../../../../src/lib/Book/domain/BookPublishDate';
import { BookPagesCount } from '../../../../src/lib/Book/domain/BookPagesCount';
import { BookISBN } from '../../../../src/lib/Book/domain/BookISBN';
import { BookAuthorId } from '../../../../src/lib/Book/domain/BookIdAuthorId';
import { Book } from '../../../../src/lib/Book/domain/entities/Book';
import { BookId } from '../../../../src/lib/Book/domain/BookId';
import { IBookRepository } from '../../../../src/lib/Book/domain/BookRepository';

export class InMemoryBookRepository implements IBookRepository {
  private books: Book[] = [];

  constructor(books: Book[] = []) {
    this.books = books;
  }

  save(book: Book): Promise<void> {
    this.books.push(book);
    return Promise.resolve();
  }

  getAll(): Promise<Book[]> {
    return Promise.resolve(this.books);
  }

  getById(id: BookId): Promise<Book | undefined> {
    return Promise.resolve(
      this.books.find((book) => book.id.value === id.value),
    );
  }

  async edit(bookDto: BookSaveDTO): Promise<Book | undefined> {
    const index = this.books.findIndex((b) => b.id.value === bookDto.id);
    if (index !== -1) {
      const updatedBook = new Book(
        new BookId(bookDto.id),
        new BookTitle(bookDto.title),
        new BookPublishedDate(bookDto.publishedDate),
        new BookPagesCount(bookDto.pagesCount),
        new BookISBN(bookDto.ISBN),
        new BookAuthorId(bookDto.authorId),
      );
      this.books[index] = updatedBook;
      return updatedBook;
    }
    return undefined;
  }

  delete(id: BookId): Promise<Book | undefined> {
    const index = this.books.findIndex((book) => book.id.value === id.value);
    if (index !== -1) {
      const [deletedBook] = this.books.splice(index, 1);
      return Promise.resolve(deletedBook);
    }
    return Promise.resolve(undefined);
  }
}
