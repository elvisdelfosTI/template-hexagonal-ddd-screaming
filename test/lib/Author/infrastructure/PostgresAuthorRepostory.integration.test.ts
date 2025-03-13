import { PrismaClient } from '@prisma/client';
import { AuthorId } from '../../../../src/lib/Author/domain/AuthorId';
import { AuthorName } from '../../../../src/lib/Author/domain/AuthorName';
import { PrismaAuthorRepository } from '../../../../src/lib/Author/infrastructure/database/PrismaAuthorRepository';
import { AuthorStub } from '../domain/AuthorStub';

describe('PostgresAuthorRepository', () => {
  let prisma: PrismaClient;
  let repository: PrismaAuthorRepository;
  beforeAll(async () => {
    prisma = new PrismaClient();
    repository = new PrismaAuthorRepository(prisma);
  });
  beforeEach(async () => {
    await prisma.author.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create an author', async () => {
    const author = AuthorStub.generate();
    const authorSavedId: number = (await repository.save(author)) ?? 0;
    const savedAuthor = await repository.getById(new AuthorId(authorSavedId));
    expect(savedAuthor).toBeDefined();
  });

  it('should get author by id', async () => {
    const author = AuthorStub.generate();
    const authorSavedId: number = (await repository.save(author)) ?? 0;
    const foundAuthor = await repository.getById(new AuthorId(authorSavedId));
    expect(foundAuthor).toBeDefined();
    expect(foundAuthor?.email.value).toBe(author.email.value);
  });

  it('should get all authors', async () => {
    const author1 = AuthorStub.generate();
    const author2 = AuthorStub.generate();
    await repository.save(author1);
    await repository.save(author2);

    const authors = await repository.getAll();
    expect(authors.length).toBeGreaterThanOrEqual(2);
  });

  it('should edit an author', async () => {
    const author = AuthorStub.generate();
    const authorSavedId: number = (await repository.save(author)) ?? 0;

    const updatedName = 'Updated Name';
    author.name = new AuthorName(updatedName);
    author.id = new AuthorId(authorSavedId);
    await repository.edit(author);

    const editedAuthor = await repository.getById(
      new AuthorId(author.id.value),
    );
    expect(editedAuthor?.name.value).toBe(updatedName);
  });

  it('should delete an author', async () => {
    const author = AuthorStub.generate();
    const authorSavedId: number = (await repository.save(author)) ?? 0;

    await repository.delete(new AuthorId(authorSavedId));
    const deletedAuthor = await repository.getById(new AuthorId(authorSavedId));
    expect(deletedAuthor).toBeUndefined();
  });
});
