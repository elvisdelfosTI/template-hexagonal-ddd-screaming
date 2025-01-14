import { PrismaBookRepository } from 'src/lib/Book/infrastructure/database/PrismaBookRepository';
import { BookById } from '../../Book/application/UsesCases/BookById/BookById';
import { BookDelete } from '../../Book/application/UsesCases/BookDelete/BookDelete';
import { BookGetAll } from './application/UsesCases/BookGetAll/BookGetAll';
import { BookSave } from './application/UsesCases/BookSave/BookSave';
import { prismaClient } from 'src/prisma';

const BookRepository = new PrismaBookRepository(prismaClient);
export default {
  AuthorService: {
    getAll: new AuthorGetAll(AuthorRepository),
    getById: new AuthorById(AuthorRepository),
    save: new AuthorSave(AuthorRepository),
    delete: new AuthorDelete(AuthorRepository),
  },
  BookService: {
    getAll: new BookGetAll(BookRepository),
    getById: new BookById(BookRepository),
    save: new BookSave(BookRepository),
    delete: new BookDelete(BookRepository),
  },
};
