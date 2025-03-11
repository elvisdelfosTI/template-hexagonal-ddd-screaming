import { BookEdit } from '../../../../../src/lib/Book/application/UsesCases/BookEdit/BookEdit';
import { BookGetById } from '../../../../../src/lib/Book/application/UsesCases/BookGetById/BookGetById';
import { BookSave } from '../../../../../src/lib/Book/application/UsesCases/BookSave/BookSave';
import type { BookSaveDTO } from '../../../../../src/lib/Book/application/UsesCases/BookSave/BookSaveDTO';
import { BookId } from '../../../../../src/lib/Book/domain/BookId';
import type { IBookRepository } from '../../../../../src/lib/Book/domain/BookRepository';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';

describe('BookEdit', () => {
	let bookRepository: IBookRepository;
	let saveUseCase: BookSave;
	let book: BookSaveDTO;
	let updatedBook: BookSaveDTO;
	let getByIdUseCase: BookGetById;
	let editUseCase: BookEdit;
	beforeAll(() => {
		bookRepository = new InMemoryBookRepository([]);
		saveUseCase = new BookSave(bookRepository);
		book = BookStub.generateDTO();
		updatedBook = BookStub.generateDTO();
		getByIdUseCase = new BookGetById(bookRepository);
		editUseCase = new BookEdit(bookRepository);
	});

	test('should edit a book', async () => {
		await saveUseCase.execute(book);
		const bookToEdit = await bookRepository.getById(new BookId(book.id));
		if (!bookToEdit) throw new Error('Book not found');

		await editUseCase.execute({
			id: book.id,
			title: updatedBook.title,
			publishedDate: updatedBook.publishedDate,
			pagesCount: updatedBook.pagesCount,
			ISBN: updatedBook.ISBN,
			authorId: updatedBook.authorId,
		});

		const editedBook = await getByIdUseCase.execute(book.id);
		expect(editedBook.title.value).toBe(updatedBook.title);
		expect(editedBook.ISBN.value).toBe(updatedBook.ISBN);
	});
});
