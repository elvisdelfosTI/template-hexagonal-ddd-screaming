import { AuthorId } from '../../../../src/lib/Author/domain/AuthorId';
import { PrismaAuthorRepository } from '../../../../src/lib/Author/infrastructure/database/PrismaAuthorRepository';
import { BookId } from '../../../../src/lib/Book/domain/BookId';
import { BookAuthorId } from '../../../../src/lib/Book/domain/BookIdAuthorId';
import { BookTitle } from '../../../../src/lib/Book/domain/BookTitle';
import { PrismaBookRepository } from '../../../../src/lib/Book/infrastructure/database/PrismaBookRepository';
import { prismaClient } from '../../../../src/prisma';
import { AuthorStub } from '../../Author/domain/AuthorStub';
import { BookStub } from '../../Book/domain/BookStub';

describe('PostgresBookRepository', () => {
	let authorId: number;

	beforeAll(async () => {
		// Crear un autor para usar en las pruebas
		const authorRepository = new PrismaAuthorRepository(prismaClient);
		const author = AuthorStub.generate();
		await authorRepository.save(author);
		authorId = author.id.value;
	});

	afterAll(async () => {
		// Limpiar el autor creado
		const authorRepository = new PrismaAuthorRepository(prismaClient);
		await authorRepository.delete(new AuthorId(authorId));
	});
	const createBookWithValidAuthor = () => {
		const book = BookStub.generate();
		book.authorId = new BookAuthorId(authorId);
		return book;
	};

	it('should create a book', async () => {
		const repository = new PrismaBookRepository(prismaClient);
		const book = createBookWithValidAuthor();
		await repository.save(book);
		const savedBook = await repository.getById(new BookId(book.id.value));
		expect(savedBook).toBeDefined();
		expect(savedBook?.id.value).toBe(book.id.value);
		expect(savedBook?.title.value).toBe(book.title.value);
		await repository.delete(book.id);
	});

	it('should get book by id', async () => {
		const repository = new PrismaBookRepository(prismaClient);
		const book = createBookWithValidAuthor();
		await repository.save(book);
		const foundBook = await repository.getById(new BookId(book.id.value));
		expect(foundBook).toBeDefined();
		expect(foundBook?.ISBN.value).toBe(book.ISBN.value);
		await repository.delete(book.id);
	});

	it('should get all books', async () => {
		const repository = new PrismaBookRepository(prismaClient);
		const book1 = createBookWithValidAuthor();
		const book2 = createBookWithValidAuthor();
		await repository.save(book1);
		await repository.save(book2);

		const books = await repository.getAll();
		expect(books.length).toBeGreaterThanOrEqual(2);

		await repository.delete(book1.id);
		await repository.delete(book2.id);
	});

	it('should edit a book', async () => {
		const repository = new PrismaBookRepository(prismaClient);
		const book = createBookWithValidAuthor();
		await repository.save(book);

		const updatedTitle = 'Updated Title';
		book.title = new BookTitle(updatedTitle);
		await repository.edit(book);

		const editedBook = await repository.getById(new BookId(book.id.value));
		expect(editedBook?.title.value).toBe(updatedTitle);
		await repository.delete(book.id);
	});

	it('should delete a book', async () => {
		const repository = new PrismaBookRepository(prismaClient);
		const book = createBookWithValidAuthor();
		await repository.save(book);

		await repository.delete(book.id);
		const deletedBook = await repository.getById(new BookId(book.id.value));
		expect(deletedBook).toBeUndefined();
	});
});
