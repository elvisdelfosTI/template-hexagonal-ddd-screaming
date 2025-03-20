import { AuthSignIn } from '@auth/application/UsesCases/AuthSignIn';
import { AuthorGetByEmail } from '@author/application/UsesCases/AuthorByEmail/AuthorByEmail';
import { AuthorGetById } from '@author/application/UsesCases/AuthorById/AuthorById';
import { AuthorDelete } from '@author/application/UsesCases/AuthorDelete/AuthorDelete';
import { AuthorEdit } from '@author/application/UsesCases/AuthorEdit/AuthorEdit';
import { AuthorGetAll } from '@author/application/UsesCases/AuthorGetAll/AuthorGetAll';
import { AuthorSave } from '@author/application/UsesCases/UserSave/AuthorSave';
import { DrizzleAuthorRepository } from '@author/infrastructure/database/DrizzleAuthorRepository';
import { PrismaAuthorRepository } from '@author/infrastructure/database/PrismaAuthorRepository';
import { BookDelete } from '@book/application/UsesCases/BookDelete/BookDelete';
import { BookEdit } from '@book/application/UsesCases/BookEdit/BookEdit';
import { BookGetAll } from '@book/application/UsesCases/BookGetAll/BookGetAll';
import { BookGetById } from '@book/application/UsesCases/BookGetById/BookGetById';
import { BookSave } from '@book/application/UsesCases/BookSave/BookSave';
import { DrizzleBookRepository } from '@book/infrastructure/database/DizzleBookRepository';
import { PrismaBookRepository } from '@book/infrastructure/database/PrismaBookRepository';
import { prismaClient } from '@config/database/prisma/prisma';

//const AuthorRepository = new InMemoryAuthorRepository();
const BookRepository = new DrizzleBookRepository();
const AuthorRepository = new DrizzleAuthorRepository();
export default {
  AuthorService: {
    getAll: new AuthorGetAll(AuthorRepository),
    getById: new AuthorGetById(AuthorRepository),
    save: new AuthorSave(AuthorRepository),
    delete: new AuthorDelete(AuthorRepository),
    getByEmail: new AuthorGetByEmail(AuthorRepository),
    update: new AuthorEdit(AuthorRepository),
  },
  BookService: {
    getAll: new BookGetAll(BookRepository),
    getById: new BookGetById(BookRepository),
    save: new BookSave(BookRepository),
    delete: new BookDelete(BookRepository),
    update: new BookEdit(BookRepository),
  },
  AuthenticationService: {
    login: new AuthSignIn(AuthorRepository),
  },
};
