import { randNumber, randWord, randPastDate } from '@ngneat/falso';
import { BookSaveDTO } from '../../../../src/lib/Book/application/UsesCases/BookSave/BookSaveDTO';

export class BookStub {
  static generate(): BookSaveDTO {
    return {
      id: randNumber({ min: 1, max: 1000 }),
      title: randWord(),
      publishedDate: randPastDate(),
      pagesCount: randNumber({ min: 50, max: 1000 }),
      ISBN: randNumber({ min: 1000000000, max: 9999999999 }).toString(),
      authorId: randNumber({ min: 1, max: 1000 }),
    };
  }
}
