import { AuthorGetById } from '#author/application/UsesCases/AuthorById/AuthorById';
import { AuthorDelete } from '#author/application/UsesCases/AuthorDelete/AuthorDelete';
import { AuthorGetAll } from '#author/application/UsesCases/AuthorGetAll/AuthorGetAll';
import { AuthorSave } from '#author/application/UsesCases/UserSave/AuthorSave';
import { prismaClient } from '../../../prisma';
import { AuthorGetByEmail } from '#author/application/UsesCases/AuthorByEmail/AuthorByEmail';
import { BookGetAll } from '#book/application/UsesCases/BookGetAll/BookGetAll';
import { PrismaBookRepository } from '#book/infrastructure/database/PrismaBookRepository';
import { PrismaAuthorRepository } from '#author/infrastructure/database/PrismaAuthorRepository';
import { BookGetById } from '#book/application/UsesCases/BookGetById/BookGetById';
import { BookSave } from '#book/application/UsesCases/BookSave/BookSave';
import { BookDelete } from '#book/application/UsesCases/BookDelete/BookDelete';
import { AuthSignIn } from '#auth/application/UsesCases/AuthSignIn';
import { AuthorEdit } from '#author/application/UsesCases/AuthorEdit/AuthorEdit';
import { BookEdit } from '#book/application/UsesCases/BookEdit/BookEdit';

//const AuthorRepository = new InMemoryAuthorRepository();
const BookRepository = new PrismaBookRepository(prismaClient);
const AuthorRepository = new PrismaAuthorRepository(prismaClient);
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
