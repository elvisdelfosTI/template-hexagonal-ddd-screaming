import { PrismaBookRepository } from 'src/lib/Book/infrastructure/database/PrismaBookRepository';
import { Book } from '../../../domain/Book';

export class BookSave {
  private bookRepository: PrismaBookRepository;

  constructor(bookRepository: PrismaBookRepository) {
    this.bookRepository = bookRepository;
  }

  async save(bookData: Book): Promise<Book> {
    return await this.bookRepository.save(bookData);
  }
}
