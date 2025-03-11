import { AuthorAge } from '#author/domain/AuthorAge';
import { AuthorEmail } from '#author/domain/AuthorEmail';
import { AuthorId } from '#author/domain/AuthorId';
import { AuthorName } from '#author/domain/AuthorName';
import { AuthorPassword } from '#author/domain/AuthorPassword';
import type { IAuthorRepository } from '#author/domain/AuthorRepository';
import { Author } from '#author/domain/entities/Author';
import type { AuthorDto } from './AuthorSaveDTO';

export class AuthorSave {
	constructor(private _repository: IAuthorRepository) {}
	async execute(dto: AuthorDto): Promise<undefined | number> {
		const isExist = await this._repository.getByEmail(
			new AuthorEmail(dto.email),
		);
		if (isExist) {
			throw new Error('Author already exist');
		}
		const author = new Author(
			new AuthorId(dto.id),
			new AuthorName(dto.name),
			new AuthorEmail(dto.email),
			new AuthorPassword(dto.password),
			new AuthorAge(dto.age),
		);
		return await this._repository.save(author);
	}
}
