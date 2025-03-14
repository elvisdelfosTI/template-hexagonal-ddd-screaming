import { BookId } from '../../../domain/BookId';
import type { IBookRepository } from '../../../domain/BookRepository';
import type { Book } from '../../../domain/entities/Book';
import type { BookSaveDTO } from '../BookSave/BookSaveDTO';

class BookEdit {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(updatedData: BookSaveDTO): Promise<Book> {
    const book = await this.bookRepository.getById(new BookId(updatedData.id));
    if (!book) {
      throw new Error('Book not found');
    }
    await this.bookRepository.edit(updatedData);

    return book;
  }
}

export { BookEdit };
