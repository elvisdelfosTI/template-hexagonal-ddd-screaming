import { Author } from '../../../domain/entities/Author';
import { IAuthorRepository } from '../../../domain/AuthorRepository';

export class AuthorGetAll {
  constructor(private _repository: IAuthorRepository) {}
  async handler(): Promise<Author[]> {
    return this._repository.getAll();
  }
}
