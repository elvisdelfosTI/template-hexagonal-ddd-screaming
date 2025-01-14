import { PrismaBookRepository } from 'src/lib/Book/infrastructure/database/PrismaBookRepository';
import { Book } from '../../../domain/Book';

export class BookGetAll {
  private bookRepository: PrismaBookRepository;

  constructor(bookRepository: PrismaBookRepository) {
    this.bookRepository = bookRepository;
  }

  async getAll(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
