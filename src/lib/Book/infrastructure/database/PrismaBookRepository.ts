import type { PrismaClient } from 'node_modules/.prisma/client/index';
import type { BookSaveDTO } from '#book/application/UsesCases/BookSave/BookSaveDTO';
import { BookISBN } from '../../domain/BookISBN';
import { BookId } from '../../domain/BookId';
import { BookAuthorId } from '../../domain/BookIdAuthorId';
import { BookPagesCount } from '../../domain/BookPagesCount';
import { BookPublishedDate } from '../../domain/BookPublishDate';
import type { IBookRepository } from '../../domain/BookRepository';
import { BookTitle } from '../../domain/BookTitle';
import { Book } from '../../domain/entities/Book';

export class PrismaBookRepository implements IBookRepository {
	constructor(private _prisma: PrismaClient) {}

	async edit(book: BookSaveDTO): Promise<Book | undefined> {
		await this._prisma.book.update({
			where: { id: book.id },
			data: {
				title: book.title,
				publishedDate: book.publishedDate,
				pagesCount: book.pagesCount,
				ISBN: book.ISBN,
				authorId: book.authorId,
			},
		});
		return new Book(
			new BookId(book.id),
			new BookTitle(book.title),
			new BookPublishedDate(book.publishedDate),
			new BookPagesCount(book.pagesCount),
			new BookISBN(book.ISBN),
			new BookAuthorId(book.authorId),
		);
	}

	async getById(id: BookId): Promise<Book | undefined> {
		const book = await this._prisma.book.findUnique({
			where: { id: id.value },
		});
		if (!book) return undefined;
		return new Book(
			new BookId(book.id),
			new BookTitle(book.title),
			new BookPublishedDate(book.publishedDate),
			new BookPagesCount(book.pagesCount),
			new BookISBN(book.ISBN),
			new BookAuthorId(book.authorId),
		);
	}

	async getAll(): Promise<Book[]> {
		const books = await this._prisma.book.findMany();
		return books.map(
			(book: Record<string, unknown>) =>
				new Book(
					new BookId(book.id as number),
					new BookTitle(book.title as string),
					new BookPublishedDate(book.publishedDate as Date),
					new BookPagesCount(book.pagesCount as number),
					new BookISBN(book.ISBN as string),
					new BookAuthorId(book.authorId as number),
				),
		);
	}

	async save(book: Book): Promise<void> {
		await this._prisma.book.create({
			data: {
				//id: book.id.value,
				title: book.title.value,
				publishedDate: book.publishedDate.value,
				pagesCount: book.pagesCount.value,
				ISBN: book.ISBN.value,
				authorId: book.authorId.value,
			},
		});
	}

	async delete(id: BookId): Promise<Book | undefined> {
		const deletedBook = await this._prisma.book.delete({
			where: { id: id.value },
		});
		return new Book(
			new BookId(deletedBook.id),
			new BookTitle(deletedBook.title),
			new BookPublishedDate(deletedBook.publishedDate),
			new BookPagesCount(deletedBook.pagesCount),
			new BookISBN(deletedBook.ISBN),
			new BookAuthorId(deletedBook.authorId),
		);
	}
}
