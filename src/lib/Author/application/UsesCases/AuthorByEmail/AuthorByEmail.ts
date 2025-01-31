import type { IAuthorRepository } from '#author/domain/AuthorRepository';
import type { AuthorDto } from '../UserSave/AuthorSaveDTO';
import { AuthorEmail } from '#author/domain/AuthorEmail';
import { AuthorNotFoundError } from '#author/domain/errors/AuthorNotFoundError';

export class AuthorGetByEmail {
	constructor(private readonly _repository: IAuthorRepository) {}

	async execute(email: string): Promise<AuthorDto> {
		const Author = await this._repository.getByEmail(new AuthorEmail(email));
		if (!Author) throw new AuthorNotFoundError('Author not found');
		return Author.mapToPrimitives();
	}
}
