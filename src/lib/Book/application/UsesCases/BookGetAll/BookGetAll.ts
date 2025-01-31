import type { Book } from '../../../domain/entities/Book';
import type { IBookRepository } from '../../../domain/BookRepository';
export class BookGetAll {
	constructor(private readonly _repository: IBookRepository) {}

	async execute(): Promise<Book[]> {
		return this._repository.getAll();
	}
}
