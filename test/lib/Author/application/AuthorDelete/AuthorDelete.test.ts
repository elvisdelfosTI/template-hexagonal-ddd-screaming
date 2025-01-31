import { AuthorSave } from '../../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSave';
import { AuthorStub } from '../../domain/AuthorStub';
import { InMemoryAuthorRepository } from '../../infrastructure/InMemoryAuthorRespository';
import { AuthorDelete } from '../../../../../src/lib/Author/application/UsesCases/AuthorDelete/AuthorDelete';

describe('AuthorDelete', () => {
	test('should delete an author', async () => {
		const authorRepository = new InMemoryAuthorRepository([]);
		const controller = new AuthorSave(authorRepository);
		const author = AuthorStub.generateDTO();
		await controller.execute(author);

		const authors = await authorRepository.getAll();
		const userCase = new AuthorDelete(authorRepository);
		await userCase.execute(authors[0].id.value);
		const authorsAfterDelete = await authorRepository.getAll();
		expect(authorsAfterDelete).toHaveLength(0);
	});
});
