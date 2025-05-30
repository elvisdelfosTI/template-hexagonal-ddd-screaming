import { BookDelete } from '../../../../../src/lib/Book/application/UsesCases/BookDelete/BookDelete';
import { BookSave } from '../../../../../src/lib/Book/application/UsesCases/BookSave/BookSave';
import { BookId } from '../../../../../src/lib/Book/domain/BookId';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';

describe('BookDelete', () => {
  test('should delete a book', async () => {
    const bookRepository = new InMemoryBookRepository([]);
    const saveUseCase = new BookSave(bookRepository);
    const book = BookStub.generateDTO();
    await saveUseCase.execute(book);

    const deleteUseCase = new BookDelete(bookRepository);
    await deleteUseCase.execute(book.id);

    const bookAfterDelete = await bookRepository.getById(new BookId(book.id));
    expect(bookAfterDelete).toBeUndefined();
  });
});
