import { BookGetAll } from '../../../../../src/lib/Book/application/UsesCases/BookGetAll/BookGetAll';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';

describe('BookGetAll should return all books', () => {
  test('should return all books', async () => {
    const bookRepository = new InMemoryBookRepository([]);
    const useCase = new BookGetAll(bookRepository);
    const books = await useCase.execute();
    expect(books).toHaveLength(0);
  });
});
