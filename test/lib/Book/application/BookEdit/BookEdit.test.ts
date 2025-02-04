import { BookEdit } from '../../../../../src/lib/Book/application/UsesCases/BookEdit/BookEdit';
import { BookGetById } from '../../../../../src/lib/Book/application/UsesCases/BookGetById/BookGetById';
import { BookSave } from '../../../../../src/lib/Book/application/UsesCases/BookSave/BookSave';
import { BookId } from '../../../../../src/lib/Book/domain/BookId';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';

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
			id: book.id,
			title: updatedBook.title,
			publishedDate: updatedBook.publishedDate,
			pagesCount: updatedBook.pagesCount,
			ISBN: updatedBook.ISBN,
			authorId: updatedBook.authorId,
		});

		const getByIdUseCase = new BookGetById(bookRepository);
		const editedBook = await getByIdUseCase.execute(book.id);
		expect(editedBook.title.value).toBe(updatedBook.title);
		expect(editedBook.ISBN.value).toBe(updatedBook.ISBN);
	});
});
