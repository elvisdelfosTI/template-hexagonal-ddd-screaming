export class Book {
  id: string;
  title: string;
  author: string;
  publishedDate: Date;

  constructor(id: string, title: string, author: string, publishedDate: Date) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publishedDate = publishedDate;
  }
}
