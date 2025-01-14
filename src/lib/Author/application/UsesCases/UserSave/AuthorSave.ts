import { Author } from '../../../domain/entities/Author';
import { AuthorEmail } from '../../../domain/AuthorEmail';
import { AuthorId } from '../../../domain/AuthorId';
import { AuthorName } from '../../../domain/AuthorName';
import { AuthorPassword } from '../../../domain/AuthorPassword';
import { IAuthorRepository } from '../../../domain/AuthorRepository';

export class AuthorSave {
  constructor(private _repository: IAuthorRepository) {}
  async handler(
    id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const author = new Author(
      new AuthorId(id),
      new AuthorName(name),
      new AuthorEmail(email),
      new AuthorPassword(password),
    );
    return this._repository.save(author);
  }
}
