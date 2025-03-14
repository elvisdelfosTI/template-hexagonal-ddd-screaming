import type { IBookRepository } from '../../../domain/BookRepository';
import type { Book } from '../../../domain/entities/Book';
export class BookGetAll {
  constructor(private readonly _repository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    return this._repository.getAll();
  }
}
