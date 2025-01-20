import { BookId } from './BookId';
import { Book } from './entities/Book';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  getAll(): Promise<Book[]>;
  getById(id: BookId): Promise<Book | undefined>;
  edit(book: Book): Promise<Book | undefined>;
  delete(id: BookId): Promise<Book | undefined>;
}
