import { Author } from './entities/Author';
import { AuthorId } from './AuthorId';
import { AuthorEmail } from './AuthorEmail';

export interface IAuthorRepository {
  save(author: Author): Promise<void | number>;
  getAll(): Promise<Author[]>;
  getById(id: AuthorId): Promise<Author | undefined>;
  edit(author: Author): Promise<Author | undefined>;
  delete(id: AuthorId): Promise<Author | undefined>;
  getByEmail(email: AuthorEmail): Promise<Author | undefined>;
}
