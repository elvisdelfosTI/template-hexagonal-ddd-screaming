import { AuthorEmail } from '../../domain/AuthorEmail';
import { AuthorId } from '../../domain/AuthorId';
import { AuthorName } from '../../domain/AuthorName';
import { AuthorPassword } from '../../domain/AuthorPassword';
import { IAuthorRepository } from '../../domain/AuthorRepository';
import { Author } from '../../domain/entities/Author';
import { PrismaClient } from 'node_modules/.prisma/client/index';

export class PrismaAuthorRepository implements IAuthorRepository {
  constructor(private _prisma: PrismaClient) {}
  getById(id: AuthorId): Promise<Author | undefined> {
    throw new Error('Method not implemented.');
  }
  edit(id: AuthorId): Promise<Author | undefined> {
    throw new Error('Method not implemented.');
  }
  delete(id: AuthorId): Promise<Author | undefined> {
    throw new Error('Method not implemented.');
  }
  async save(author: Author): Promise<void> {
    await this._prisma.author.create({
      data: {
        id: author.id.value,
        name: author.name.value,
        email: author.email.value,
        password: author.password.value,
      },
    });
  }

  async getAll(): Promise<Author[]> {
    const authors = await this._prisma.author.findMany();
    return authors.map(
      (author) =>
        new Author(
          new AuthorId(author.id),
          new AuthorName(author.name),
          new AuthorEmail(author.email),
          new AuthorPassword(author.password),
        ),
    );
  }
}
