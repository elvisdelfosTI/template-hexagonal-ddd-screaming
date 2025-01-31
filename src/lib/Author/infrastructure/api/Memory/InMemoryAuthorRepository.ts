import type { Author } from '#author/domain/entities/Author';
import type { AuthorId } from '#author/domain/AuthorId';
import type { IAuthorRepository } from '#author/domain/AuthorRepository';
import type { AuthorEmail } from '#author/domain/AuthorEmail';

export class InMemoryAuthorRepository implements IAuthorRepository {
	private Authors: Author[] = [];

	async getByEmail(email: AuthorEmail): Promise<Author | undefined> {
		return this.Authors.find((author) => author.email.value === email.value);
	}

	async save(author: Author): Promise<number | undefined> {
		this.Authors.push(author);
		return Promise.resolve(this.Authors.length - 1);
	}

	async getAll(): Promise<Author[]> {
		return Promise.resolve(this.Authors);
	}

	async getById(id: AuthorId): Promise<Author | undefined> {
		return Promise.resolve(
			this.Authors.find((author) => author.id.value === id.value),
		);
	}

	async edit(author: Author): Promise<Author | undefined> {
		const index = this.Authors.findIndex((a) => a.id.value === author.id.value);
		if (index === -1) return undefined;

		this.Authors[index] = author;
		return Promise.resolve(author);
	}

	async delete(id: AuthorId): Promise<Author | undefined> {
		const index = this.Authors.findIndex(
			(author) => author.id.value === id.value,
		);
		if (index === -1) return undefined;

		const [deletedAuthor] = this.Authors.splice(index, 1);
		return Promise.resolve(deletedAuthor);
	}
}
