import { BookId } from '../../../domain/BookId';
import type { IBookRepository } from '../../../domain/BookRepository';

export class BookDelete {
	constructor(private readonly _repository: IBookRepository) {}

	async execute(id: number): Promise<void> {
		const bookId = new BookId(id);
		await this._repository.delete(bookId);
	}
}
