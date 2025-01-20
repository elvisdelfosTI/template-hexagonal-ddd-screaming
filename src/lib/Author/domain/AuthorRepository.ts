import { Author } from './entities/Author';
import { AuthorId } from './AuthorId';

export interface IAuthorRepository {
  save(author: Author): Promise<void>;
  getAll(): Promise<Author[]>;
  getById(id: AuthorId): Promise<Author | undefined>;
  edit(author: Author): Promise<Author | undefined>;
  delete(id: AuthorId): Promise<Author | undefined>;
}
