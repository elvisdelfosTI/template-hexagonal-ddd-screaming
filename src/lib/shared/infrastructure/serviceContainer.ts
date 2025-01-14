import { PrismaAuthorRepository } from 'src/lib/Author/infrastructure/database/PrismaAuthorRepository';
import { AuthorById } from '../../Author/application/UsesCases/AuthorById/AuthorById';
import { AuthorDelete } from '../../Author/application/UsesCases/AuthorDelete/AuthorDelete';
import { AuthorGetAll } from '../../Author/application/UsesCases/AuthorGetAll/AuthorGetAll';
import { AuthorSave } from '../../Author/application/UsesCases/UserSave/AuthorSave';
import { prismaClient } from 'src/prisma';
import { InMemoryAuthorRepository } from 'src/lib/Author/infrastructure/api/Memory/inMemoryAuthorRepository';

//const AuthorRepository = new InMemoryAuthorRepository();
const AuthorRepository = new PrismaAuthorRepository(prismaClient);
export default {
  AuthorService: {
    getAll: new AuthorGetAll(AuthorRepository),
    getById: new AuthorById(AuthorRepository),
    save: new AuthorSave(AuthorRepository),
    delete: new AuthorDelete(AuthorRepository),
  },
  BookService: {},
};
