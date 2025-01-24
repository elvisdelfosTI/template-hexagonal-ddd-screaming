import { PrismaAuthorRepository } from '../../../../src/lib/Author/infrastructure/database/PrismaAuthorRepository';
import { prismaClient } from '../../../../src/prisma';
import { AuthorName } from '../../../../src/lib/Author/domain/AuthorName';
import { AuthorId } from '../../../../src/lib/Author/domain/AuthorId';
import { AuthorStub } from '../domain/AuthorStub';

describe('PostgresAuthorRepository', () => {
  it('should create an author', async () => {
    const repository = new PrismaAuthorRepository(prismaClient);
    const author = AuthorStub.generate();
    await repository.save(author);
    const savedAuthor = await repository.getById(new AuthorId(author.id.value));
    expect(savedAuthor).toBeDefined();
    expect(savedAuthor?.id.value).toBe(author.id.value);
    expect(savedAuthor?.name.value).toBe(author.name.value);
    await repository.delete(author.id);
  });

  it('should get author by id', async () => {
    const repository = new PrismaAuthorRepository(prismaClient);
    const author = AuthorStub.generate();
    await repository.save(author);
    const foundAuthor = await repository.getById(new AuthorId(author.id.value));
    expect(foundAuthor).toBeDefined();
    expect(foundAuthor?.email.value).toBe(author.email.value);
    await repository.delete(author.id);
  });

  it('should get all authors', async () => {
    const repository = new PrismaAuthorRepository(prismaClient);
    const author1 = AuthorStub.generate();
    const author2 = AuthorStub.generate();
    await repository.save(author1);
    await repository.save(author2);

    const authors = await repository.getAll();
    expect(authors.length).toBeGreaterThanOrEqual(2);

    await repository.delete(author1.id);
    await repository.delete(author2.id);
  });

  it('should edit an author', async () => {
    const repository = new PrismaAuthorRepository(prismaClient);
    const author = AuthorStub.generate();
    await repository.save(author);

    const updatedName = 'Updated Name';
    author.name = new AuthorName(updatedName);
    await repository.edit(author);

    const editedAuthor = await repository.getById(
      new AuthorId(author.id.value),
    );
    expect(editedAuthor?.name.value).toBe(updatedName);
    await repository.delete(author.id);
  });

  it('should delete an author', async () => {
    const repository = new PrismaAuthorRepository(prismaClient);
    const author = AuthorStub.generate();
    await repository.save(author);

    await repository.delete(author.id);
    const deletedAuthor = await repository.getById(
      new AuthorId(author.id.value),
    );
    expect(deletedAuthor).toBeUndefined();
  });
});
