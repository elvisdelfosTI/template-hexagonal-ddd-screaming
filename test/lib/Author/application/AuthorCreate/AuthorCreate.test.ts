import { InMemoryAuthorRepository } from '../../infrastructure/InMemoryAuthorRespository';
import { AuthorSave } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSave';
import { AuthorStub } from '../../domain/AuthorStub';

describe('AuthorCreate', () => {
  test('should create an author', async () => {
    const authorRepository = new InMemoryAuthorRepository([]);
    const userCase = new AuthorSave(authorRepository);
    const author = AuthorStub.generateDTO();
    await userCase.execute(author);

    const authors = await authorRepository.getAll();
    expect(authors).toHaveLength(1);
  });
});
