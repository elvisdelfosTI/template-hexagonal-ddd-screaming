import { InMemoryAuthorRepository } from "../../infrastructure/InMemoryAuthorRepository";
import { AuthorGetAll } from '../../../../../src/lib/Author/application/UsesCases/AuthorGetAll/AuthorGetAll';

describe('AuthorGetAll should return all authors', () => {
  test('should return all authors', async () => {
    const authorRepository = new InMemoryAuthorRepository([]);
    const userCase = new AuthorGetAll(authorRepository);
    const authors = await userCase.execute();
    expect(authors).toHaveLength(0);
  });
});
