import { prismaClient } from 'src/prisma';
import { Book } from '../../domain/entities/Book';

export class PrismaBookRepository {
  async getById(id: string): Promise<Book | null> {
    return await prismaClient.book.findUnique({
      where: { id },
    });
  }

  async getAll(): Promise<Book[]> {
    return await prismaClient.book.findMany();
  }

  async save(book: Book): Promise<Book> {
    return await prismaClient.book.create({
      data: book,
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.book.delete({
      where: { id },
    });
  }
}
