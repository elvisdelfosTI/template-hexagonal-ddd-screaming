import type { IBookRepository } from 'src/lib/Book/domain/BookRepository';
import { BookISBN } from '../../../domain/BookISBN';
import { BookId } from '../../../domain/BookId';
import { BookAuthorId } from '../../../domain/BookIdAuthorId';
import { BookPagesCount } from '../../../domain/BookPagesCount';
import { BookPublishedDate } from '../../../domain/BookPublishDate';
import { BookTitle } from '../../../domain/BookTitle';
import { Book } from '../../../domain/entities/Book';
import type { BookSaveDTO } from './BookSaveDTO';

export class BookSave {
	constructor(private _repository: IBookRepository) {}

	async execute(dto: BookSaveDTO): Promise<void> {
		const book = new Book(
			new BookId(dto.id),
			new BookTitle(dto.title),
			new BookPublishedDate(dto.publishedDate),
			new BookPagesCount(dto.pagesCount),
			new BookISBN(dto.ISBN),
			new BookAuthorId(dto.authorId),
		);
		return this._repository.save(book);
	}
}
