import { BookId } from '../BookId';
import { BookAuthorId } from '../BookIdAuthorId';
import { BookISBN } from '../BookISBN';
import { BookPagesCount } from '../BookPagesCount';
import { BookPublishedDate } from '../BookPublishDate';
import { BookTitle } from '../BookTitle';

export class Book {
  id: BookId;
  title: BookTitle;
  publishedDate: BookPublishedDate;
  pagesCount: BookPagesCount;
  ISBN: BookISBN;
  authorId: BookAuthorId;

  constructor(
    id: BookId,
    title: BookTitle,
    publishedDate: BookPublishedDate,
    pagesCount: BookPagesCount,
    ISBN: BookISBN,
    authorId: BookAuthorId,
  ) {
    this.id = id;
    this.title = title;
    this.publishedDate = publishedDate;
    this.pagesCount = pagesCount;
    this.ISBN = ISBN;
    this.authorId = authorId;
  }

  public mapToPrimitive() {
    return {
      id: this.id.value,
      title: this.title.value,
      publishedDate: this.publishedDate.value,
      pagesCount: this.pagesCount.value,
      ISBN: this.ISBN.value,
      authorId: this.authorId.value,
    };
  }
}
