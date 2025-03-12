import { AuthorGetAll } from '../../../../../src/lib/Author/application/UsesCases/AuthorGetAll/AuthorGetAll';
import { InMemoryAuthorRepository } from '../../infrastructure/InMemoryAuthorRepository';

describe('AuthorGetAll', () => {
	test('should return all authors', async () => {
		const authorRepository = new InMemoryAuthorRepository([]);
		const userCase = new AuthorGetAll(authorRepository);
		const authors = await userCase.execute();
		expect(authors).toHaveLength(0);
	});
});
