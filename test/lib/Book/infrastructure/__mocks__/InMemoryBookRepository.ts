import { Book } from 'src/lib/Book/domain/entities/Book';
import { IBookRepository } from 'src/lib/Book/domain/BookRepository';
import { BookId } from 'src/lib/Book/domain/BookId';

export class InMemoryBookRepository implements IBookRepository {
  private books: Book[];

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

  edit(book: Book): Promise<Book | undefined> {
    const index = this.books.findIndex((b) => b.id.value === book.id.value);
    if (index !== -1) {
      this.books[index] = book;
      return Promise.resolve(this.books[index]);
    }
    return Promise.resolve(undefined);
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
