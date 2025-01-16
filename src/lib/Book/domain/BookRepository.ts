import { BookId } from './BookId';
import { Book } from './entities/Book';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  getAll(): Promise<Book[]>;
  getById(id: Book): Promise<Book | undefined>;
  edit(id: BookId): Promise<Book | undefined>;
  delete(id: BookId): Promise<Book | undefined>;
}
