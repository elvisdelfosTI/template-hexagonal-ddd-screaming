import type { IBookRepository } from '../../../domain/BookRepository';
import { BookId } from '../../../domain/BookId';

export class BookDelete {
	constructor(private readonly _repository: IBookRepository) {}

	async execute(id: number): Promise<void> {
		const bookId = new BookId(id);
		await this._repository.delete(bookId);
	}
}
