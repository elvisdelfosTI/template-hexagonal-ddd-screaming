import type { Author } from './entities/Author';
import type { AuthorId } from './AuthorId';
import type { AuthorEmail } from './AuthorEmail';

export interface IAuthorRepository {
	save(author: Author): Promise<undefined | number>;
	getAll(): Promise<Author[]>;
	getById(id: AuthorId): Promise<Author | undefined>;
	edit(author: Author): Promise<Author | undefined>;
	delete(id: AuthorId): Promise<Author | undefined>;
	getByEmail(email: AuthorEmail): Promise<Author | undefined>;
}
