import { BookGetById } from 'src/lib/Book/application/UsesCases/BookGetById/BookGetById';
import { BookSave } from 'src/lib/Book/application/UsesCases/BookSave/BookSave';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';

describe('BookGetById', () => {
	test('should get a book by id', async () => {
		const bookRepository = new InMemoryBookRepository([]);
		const saveUseCase = new BookSave(bookRepository);
		const book = BookStub.generateDTO();
		await saveUseCase.execute(book);

		const getByIdUseCase = new BookGetById(bookRepository);
		const foundBook = await getByIdUseCase.execute(book.id);
		expect(foundBook).toBeDefined();
		expect(foundBook?.id.value).toBe(book.id);
	});
});
