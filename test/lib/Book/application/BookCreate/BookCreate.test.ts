import { BookSave } from '../../../../../src/lib/Book/application/UsesCases/BookSave/BookSave';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/__mocks__/InMemoryBookRepository';

describe('BookCreate', () => {
  test('should create a book', async () => {
    const bookRepository = new InMemoryBookRepository([]);
    const useCase = new BookSave(bookRepository);
    const book = BookStub.generate();
    await useCase.execute(book);

    const books = await bookRepository.getAll();
    expect(books).toHaveLength(1);
  });
});
