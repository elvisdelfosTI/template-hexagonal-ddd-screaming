import { Book } from '../../../domain/entities/Book';
import { IBookRepository } from 'src/lib/Book/domain/BookRepository';
import { BookSaveDTO } from './BookSaveDTO';
import { BookPublishedDate } from 'src/lib/Book/domain/BookPublishDate';
import { BookPagesCount } from 'src/lib/Book/domain/BookPagesCount';
import { BookId } from 'src/lib/Book/domain/BookId';
import { BookTitle } from 'src/lib/Book/domain/BookTitle';
import { BookISBN } from 'src/lib/Book/domain/BookISBN';
import { BookAuthorId } from 'src/lib/Book/domain/BookIdAuthorId';

export class BookSave {
  constructor(private _repository: IBookRepository) {}
  async handler(dto: BookSaveDTO): Promise<void> {
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
