import { AuthorSave } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSave';
import type { AuthorDto } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
import type { IAuthorRepository } from '../../../../../src/lib/Author/domain/AuthorRepository';
import { AuthorStub } from '../../domain/AuthorStub';
import { InMemoryAuthorRepository } from '../../infrastructure/InMemoryAuthorRepository';

describe('AuthorCreate', () => {
  let authorMock: AuthorDto;
  let authorRepository: IAuthorRepository;
  let useCase: AuthorSave;
  beforeAll(() => {
    authorMock = AuthorStub.generateDTO();
    authorRepository = new InMemoryAuthorRepository([]);
    useCase = new AuthorSave(authorRepository);
  });

  test('should create an author', async () => {
    await useCase.execute(authorMock);
    const authors = await authorRepository.getAll();
    expect(authors).toHaveLength(1);
  });
});
