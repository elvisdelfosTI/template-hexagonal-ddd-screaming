import { Author } from '../../../domain/entities/Author';
import { AuthorEmail } from '../../../domain/AuthorEmail';
import { AuthorId } from '../../../domain/AuthorId';
import { AuthorName } from '../../../domain/AuthorName';
import { AuthorPassword } from '../../../domain/AuthorPassword';
import { IAuthorRepository } from '../../../domain/AuthorRepository';
import { AuthorAge } from '../../../domain/AuthorAge';
import { AuthorDto } from './AuthorSaveDTO';

export class AuthorSave {
  constructor(private _repository: IAuthorRepository) {}
  async execute(dto: AuthorDto): Promise<void> {
    const author = new Author(
      new AuthorId(dto.id),
      new AuthorName(dto.name),
      new AuthorEmail(dto.email),
      new AuthorPassword(dto.password),
      new AuthorAge(dto.age),
    );
    return this._repository.save(author);
  }
}
