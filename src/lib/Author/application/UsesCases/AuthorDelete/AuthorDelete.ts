import { Author } from '../../../domain/entities/Author';
import { AuthorId } from '../../../domain/AuthorId';
import { IAuthorRepository } from '../../../domain/AuthorRepository';

export class AuthorDelete {
  constructor(private readonly _repository: IAuthorRepository) {}
  async handler(id: number): Promise<Author | undefined> {
    return this._repository.delete(new AuthorId(id));
  }
}
