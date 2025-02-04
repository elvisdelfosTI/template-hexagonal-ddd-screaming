import { AuthorId } from '../../../domain/AuthorId';
import type { IAuthorRepository } from '../../../domain/AuthorRepository';
import type { Author } from '../../../domain/entities/Author';
import { AuthorNotFoundError } from '../../../domain/errors/AuthorNotFoundError';

export class AuthorGetById {
	constructor(private readonly _repository: IAuthorRepository) {}

	async execute(id: number): Promise<Author> {
		const Author = await this._repository.getById(new AuthorId(id));
		if (!Author) throw new AuthorNotFoundError('Author not found');
		return Author;
	}
}
