import { AuthorId } from '../../../domain/AuthorId';
import type { IAuthorRepository } from '../../../domain/AuthorRepository';

export class AuthorDelete {
	constructor(private readonly _repository: IAuthorRepository) {}

	async execute(id: number): Promise<void> {
		const authorId = new AuthorId(id);
		await this._repository.delete(authorId);
	}
}
