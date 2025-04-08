import type { BookSaveDTO } from '@book/application/UsesCases/BookSave/BookSaveDTO';
import type { BookId } from './BookId';
import type { Book } from './entities/Book';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  getAll(): Promise<Book[]>;
  getById(id: BookId): Promise<Book | undefined>;
  edit(book: BookSaveDTO): Promise<Book | undefined>;
  delete(id: BookId): Promise<Book | undefined>;
}
