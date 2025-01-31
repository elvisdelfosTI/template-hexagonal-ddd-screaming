import { BookSave } from 'src/lib/Book/application/UsesCases/BookSave/BookSave';
import { BookStub } from '../../domain/BookStub';
import { InMemoryBookRepository } from '../../infrastructure/InMemoryBookRepository';

describe('BookCreate', () => {
	test('should create a book', async () => {
		const bookRepository = new InMemoryBookRepository([]);
		const useCase = new BookSave(bookRepository);
		const book = BookStub.generateDTO();
		await useCase.execute(book);

		const books = await bookRepository.getAll();
		expect(books).toHaveLength(1);
	});
});
