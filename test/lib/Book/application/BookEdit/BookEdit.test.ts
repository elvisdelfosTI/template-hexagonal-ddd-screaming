import { BookGetById } from 'src/lib/Book/application/UsesCases/BookGetById/BookGetById';
import { BookSave } from 'src/lib/Book/application/UsesCases/BookSave/BookSave';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';
import { BookEdit } from 'src/lib/Book/application/UsesCases/BookEdit/BookEdit';
import { BookId } from 'src/lib/Book/domain/BookId';
import { BookTitle } from 'src/lib/Book/domain/BookTitle';
import { BookPublishedDate } from 'src/lib/Book/domain/BookPublishDate';
import { BookPagesCount } from 'src/lib/Book/domain/BookPagesCount';
import { BookISBN } from 'src/lib/Book/domain/BookISBN';
import { BookAuthorId } from 'src/lib/Book/domain/BookIdAuthorId';

describe('BookEdit', () => {
  test('should edit a book', async () => {
    const bookRepository = new InMemoryBookRepository([]);
    const saveUseCase = new BookSave(bookRepository);
    const book = BookStub.generateDTO();
    await saveUseCase.execute(book);

    const bookToEdit = await bookRepository.getById(new BookId(book.id));
    if (!bookToEdit) throw new Error('Book not found');
    const editUseCase = new BookEdit(bookRepository);
    const updatedBook = BookStub.generateDTO();

    await editUseCase.execute({
      id: new BookId(book.id),
      title: new BookTitle(updatedBook.title),
      publishedDate: new BookPublishedDate(updatedBook.publishedDate),
      pagesCount: new BookPagesCount(updatedBook.pagesCount),
      ISBN: new BookISBN(updatedBook.ISBN),
      authorId: new BookAuthorId(updatedBook.authorId),
    });

    const getByIdUseCase = new BookGetById(bookRepository);
    const editedBook = await getByIdUseCase.execute(book.id);
    expect(editedBook.title.value).toBe(updatedBook.title);
    expect(editedBook.ISBN.value).toBe(updatedBook.ISBN);
  });
});
