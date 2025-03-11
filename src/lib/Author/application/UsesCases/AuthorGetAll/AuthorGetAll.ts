import type { IAuthorRepository } from '#author/domain/AuthorRepository';
import type { Author } from '#author/domain/entities/Author';

export class AuthorGetAll {
	constructor(private readonly authorRepository: IAuthorRepository) {}

	async execute(): Promise<Author[]> {
		return this.authorRepository.getAll();
	}
}
