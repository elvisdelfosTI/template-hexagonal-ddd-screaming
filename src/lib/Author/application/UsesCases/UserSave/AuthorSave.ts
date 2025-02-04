import { AuthorAge } from '../../../domain/AuthorAge';
import { AuthorEmail } from '../../../domain/AuthorEmail';
import { AuthorId } from '../../../domain/AuthorId';
import { AuthorName } from '../../../domain/AuthorName';
import { AuthorPassword } from '../../../domain/AuthorPassword';
import type { IAuthorRepository } from '../../../domain/AuthorRepository';
import { Author } from '../../../domain/entities/Author';
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
