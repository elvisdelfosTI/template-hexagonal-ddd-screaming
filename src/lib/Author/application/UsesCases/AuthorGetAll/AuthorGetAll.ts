import { Author } from '../../../domain/entities/Author';
import { IAuthorRepository } from '../../../domain/AuthorRepository';

export class AuthorGetAll {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(): Promise<Author[]> {
    return this.authorRepository.getAll();
  }
}
