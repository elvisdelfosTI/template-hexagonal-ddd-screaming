import { BookId } from '../../../domain/BookId';
import type { IBookRepository } from '../../../domain/BookRepository';
import type { Book } from '../../../domain/entities/Book';
import { BookNotFoundError } from '../../../domain/errors/BookNotFoundError';

export class BookGetById {
  constructor(private readonly _repository: IBookRepository) {}

  async execute(id: number): Promise<Book> {
    const book = await this._repository.getById(new BookId(id));
    if (!book) throw new BookNotFoundError('Book not found');
    return book;
  }
}
