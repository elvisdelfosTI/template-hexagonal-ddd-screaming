import { randNumber, randWord, randPastDate } from '@ngneat/falso';
import { BookSaveDTO } from '../../../../src/lib/Book/application/UsesCases/BookSave/BookSaveDTO';
import { BookId } from 'src/lib/Book/domain/BookId';
import { BookTitle } from 'src/lib/Book/domain/BookTitle';
import { BookPublishedDate } from 'src/lib/Book/domain/BookPublishDate';
import { BookPagesCount } from 'src/lib/Book/domain/BookPagesCount';
import { BookISBN } from 'src/lib/Book/domain/BookISBN';
import { BookAuthorId } from 'src/lib/Book/domain/BookIdAuthorId';
import { Book } from 'src/lib/Book/domain/entities/Book';

export class BookStub {
  static generateDTO(): BookSaveDTO {
    return {
      id: randNumber({ min: 1, max: 1000 }),
      title: randWord(),
      publishedDate: randPastDate(),
      pagesCount: randNumber({ min: 50, max: 1000 }),
      ISBN: randNumber({ min: 1000000000, max: 9999999999 }).toString(),
      authorId: randNumber({ min: 1, max: 1000 }),
    };
  }
  static generate(): Book {
    return new Book(
      new BookId(this.generateDTO().id),
      new BookTitle(this.generateDTO().title),
      new BookPublishedDate(this.generateDTO().publishedDate),
      new BookPagesCount(this.generateDTO().pagesCount),
      new BookISBN(this.generateDTO().ISBN),
      new BookAuthorId(this.generateDTO().authorId),
    );
  }
}
