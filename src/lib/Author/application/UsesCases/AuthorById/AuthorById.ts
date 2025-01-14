import { Author } from '../../../domain/entities/Author';
import { AuthorId } from '../../../domain/AuthorId';
import { AuthorNotFoundError } from '../../../domain/AuthorNotFoundError';
import { IAuthorRepository } from '../../../domain/AuthorRepository';

export class AuthorById {
  constructor(private readonly _repository: IAuthorRepository) {}

  async handler(id: number): Promise<Author> {
    const Author = await this._repository.getById(new AuthorId(id));
    if (!Author) throw new AuthorNotFoundError('Author not found');
    return Author;
  }
}
