import { Book } from '../../../domain/entities/Book';
import { IBookRepository } from 'src/lib/Book/domain/BookRepository';
import { BookSaveDTO } from './BookSaveDTO';
import { BookId } from '../../../domain/BookId';
import { BookTitle } from '../../../domain/BookTitle';
import { BookPublishedDate } from '../../../domain/BookPublishDate';
import { BookPagesCount } from '../../../domain/BookPagesCount';
import { BookISBN } from '../../../domain/BookISBN';
import { BookAuthorId } from '../../../domain/BookIdAuthorId';

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
