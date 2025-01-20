import { AuthorSave } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSave';
import { AuthorStub } from '../../domain/UserStub';
import { InMemoryAuthorRepository } from '../../infrastructure/__mocks__/InMemoryAuthorRespository';

describe('AuthorCreate', () => {
  test('should create an author', async () => {
    const authorRepository = new InMemoryAuthorRepository([]);
    const userCase = new AuthorSave(authorRepository);
    const author = AuthorStub.generate();
    await userCase.execute(author);

    const authors = await authorRepository.getAll();
    expect(authors).toHaveLength(1);
  });
});
