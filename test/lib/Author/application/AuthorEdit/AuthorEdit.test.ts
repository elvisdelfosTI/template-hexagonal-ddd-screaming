import { AuthorGetById } from '../../../../../src/lib/Author/application/UsesCases/AuthorById/AuthorById';
import { AuthorEdit } from '../../../../../src/lib/Author/application/UsesCases/AuthorEdit/AuthorEdit';
import { AuthorSave } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSave';
import { AuthorId } from '../../../../../src/lib/Author/domain/AuthorId';
import { AuthorStub } from '../../domain/AuthorStub';
import { InMemoryAuthorRepository } from '../../infrastructure/InMemoryAuthorRepository';

describe('AuthorEdit', () => {
	test('should edit an author', async () => {
		const authorRepository = new InMemoryAuthorRepository([]);
		const saveUseCase = new AuthorSave(authorRepository);
		const author = AuthorStub.generateDTO();
		await saveUseCase.execute(author);

		const authorToEdit = await authorRepository.getById(
			new AuthorId(author.id),
		);
		if (!authorToEdit) throw new Error('Author not found');
		const editUseCase = new AuthorEdit(authorRepository);
		const updatedAuthor = AuthorStub.generateDTO();

		await editUseCase.execute({
			id: author.id,
			name: updatedAuthor.name,
			age: updatedAuthor.age,
			email: updatedAuthor.email,
			password: updatedAuthor.password,
		});

		const getByIdUseCase = new AuthorGetById(authorRepository);
		const editedAuthor = await getByIdUseCase.execute(author.id);
		expect(editedAuthor.name.value).toBe(updatedAuthor.name);
		expect(editedAuthor.email.value).toBe(updatedAuthor.email);
	});
});
