import { Book } from '../../../domain/entities/Book';
import { IBookRepository } from 'src/lib/Book/domain/BookRepository';

export class BookGetAll {
  constructor(private _repository: IBookRepository) {}

  async getAll(): Promise<Book[]> {
    return await this._repository.getAll();
  }
}
