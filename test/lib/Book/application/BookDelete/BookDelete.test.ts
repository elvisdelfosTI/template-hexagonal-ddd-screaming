import { BookSave } from '../../../../../src/lib/Book/application/UsesCases/BookSave/BookSave';
import { InMemoryBookRepository } from '../../infrastructure/__mocks__/InMemoryBookRepository';
import { BookStub } from '../../domain/BookStub';
import { BookDelete } from '../../../../../src/lib/Book/application/UsesCases/BookDelete/BookDelete';

describe('BookDelete', () => {
  test('should delete a book', async () => {
    const bookRepository = new InMemoryBookRepository([]);
    const saveUseCase = new BookSave(bookRepository);
    const book = BookStub.generate();
    await saveUseCase.execute(book);

    const books = await bookRepository.getAll();
    const deleteUseCase = new BookDelete(bookRepository);
    await deleteUseCase.execute(books[0].id.value);
    const booksAfterDelete = await bookRepository.getAll();
    expect(booksAfterDelete).toHaveLength(0);
  });
});
