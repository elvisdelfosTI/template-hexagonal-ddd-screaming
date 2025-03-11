import { AuthorId } from '#author/domain/AuthorId';
import type { IAuthorRepository } from '#author/domain/AuthorRepository';
import type { Author } from '#author/domain/entities/Author';
import { AuthorNotFoundError } from '#author/domain/errors/AuthorNotFoundError';

export class AuthorGetById {
	constructor(private readonly _repository: IAuthorRepository) {}

	async execute(id: number): Promise<Author> {
		const Author = await this._repository.getById(new AuthorId(id));
		if (!Author) throw new AuthorNotFoundError('Author not found');
		return Author;
	}
}
