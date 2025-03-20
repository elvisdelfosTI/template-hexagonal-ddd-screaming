import { AuthorSave } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSave';
import type { AuthorDto } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
import type { IAuthorRepository } from '../../../../../src/lib/Author/domain/AuthorRepository';
import { AuthorStub } from '../../domain/AuthorStub';
import { InMemoryAuthorRepository } from '../../infrastructure/InMemoryAuthorRepository';

describe('AuthorCreate', () => {
  let authorMock: AuthorDto;
  let authorRepository: IAuthorRepository;
  let useCase: AuthorSave;

  beforeAll(async () => {
    // Arrange
    authorMock = AuthorStub.generateDTO();
    authorRepository = new InMemoryAuthorRepository([]);
    useCase = new AuthorSave(authorRepository);
    await useCase.execute(authorMock);
  });

  test('should create an author', async () => {
    // Act
    const authors = await authorRepository.getAll();
    // Assert
    expect(authors).toHaveLength(1);
  });
});
