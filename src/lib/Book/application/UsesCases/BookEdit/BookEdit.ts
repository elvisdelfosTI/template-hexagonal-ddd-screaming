import { Book } from '../../../domain/entities/Book';
import { BookId } from '../../../domain/BookId';
import { IBookRepository } from '../../../domain/BookRepository';

class BookEdit {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(updatedData: Partial<Book> & { id: BookId }): Promise<Book> {
    const book = await this.bookRepository.getById(updatedData.id);
    if (!book) {
      throw new Error('Book not found');
    }

    if (updatedData.title !== undefined) book.title = updatedData.title;
    if (updatedData.publishedDate !== undefined)
      book.publishedDate = updatedData.publishedDate;
    if (updatedData.pagesCount !== undefined)
      book.pagesCount = updatedData.pagesCount;
    if (updatedData.ISBN !== undefined) book.ISBN = updatedData.ISBN;
    if (updatedData.authorId !== undefined)
      book.authorId = updatedData.authorId;

    await this.bookRepository.save(book);

    return book;
  }
}

export { BookEdit };
