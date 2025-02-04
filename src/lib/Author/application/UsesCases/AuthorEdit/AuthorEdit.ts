import { AuthorId } from '../../../domain/AuthorId';
import type { IAuthorRepository } from '../../../domain/AuthorRepository';
import { AuthorNotFoundError } from '../../../domain/errors/AuthorNotFoundError';
import type { AuthorDto } from '../UserSave/AuthorSaveDTO';

export class AuthorEdit {
	constructor(private readonly _repository: IAuthorRepository) {}

	async execute(author: AuthorDto): Promise<void> {
		const authorToEdit = await this._repository.getById(
			new AuthorId(author.id),
		);
		if (!authorToEdit) throw new AuthorNotFoundError('Author not found');

		authorToEdit.name.value = author.name;
		authorToEdit.email.value = author.email;
		authorToEdit.password.value = author.password;
		authorToEdit.age.value = author.age;

		await this._repository.edit(authorToEdit);
	}
}
