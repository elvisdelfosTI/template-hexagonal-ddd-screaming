import type { PrismaClient } from '@prisma/client';
import type { AuthorDto } from '#author/application/UsesCases/UserSave/AuthorSaveDTO';
import { AuthorAge } from '#author/domain/AuthorAge';
import { AuthorEmail } from '#author/domain/AuthorEmail';
import { AuthorId } from '#author/domain/AuthorId';
import { AuthorName } from '#author/domain/AuthorName';
import { AuthorPassword } from '#author/domain/AuthorPassword';
import type { IAuthorRepository } from '#author/domain/AuthorRepository';
import { Author } from '#author/domain/entities/Author';
import { encrypt } from '#common/encrypt/encrypt';

export class PrismaAuthorRepository implements IAuthorRepository {
	constructor(private _prisma: PrismaClient) {}
	async getById(_id: AuthorId): Promise<Author | undefined> {
		const author = await this._prisma.author.findUnique({
			where: {
				id: _id.value,
			},
		});
		if (author) {
			return new Author(
				new AuthorId(author.id),
				new AuthorName(author.name),
				new AuthorEmail(author.email),
				new AuthorPassword(author.password),
				new AuthorAge(author.age),
			);
		}
		return undefined;
	}
	async edit(_author: Author): Promise<Author | undefined> {
		const author = await this._prisma.author.update({
			where: {
				id: _author.id.value,
			},
			data: {
				name: _author.name.value,
				email: _author.email.value,
				password: await encrypt.encryptPassword(_author.password.value),
				age: _author.age.value,
			},
		});

		if (author) {
			return new Author(
				new AuthorId(author.id),
				new AuthorName(author.name),
				new AuthorEmail(author.email),
				new AuthorPassword(author.password),
				new AuthorAge(author.age),
			);
		}

		return undefined;
	}
	async delete(_id: AuthorId): Promise<Author | undefined> {
		const author = await this._prisma.author.delete({
			where: {
				id: _id.value,
			},
		});
		if (author) {
			return new Author(
				new AuthorId(author.id),
				new AuthorName(author.name),
				new AuthorEmail(author.email),
				new AuthorPassword(author.password),
				new AuthorAge(author.age),
			);
		}
		return undefined;
	}
	async save(author: Author): Promise<number | undefined> {
		const response = await this._prisma.author.create({
			data: {
				//id: author.id.value,
				name: author.name.value,
				email: author.email.value,
				password: await encrypt.encryptPassword(author.password.value),
				age: author.age.value,
			},
		});
		return response.id;
	}
	async getAll(): Promise<Author[]> {
		const authors = await this._prisma.author.findMany();
		return authors.map(
			(author: AuthorDto) =>
				new Author(
					new AuthorId(author.id),
					new AuthorName(author.name),
					new AuthorEmail(author.email),
					new AuthorPassword(author.password),
					new AuthorAge(author.age),
				),
		);
	}
	async getByEmail(email: AuthorEmail): Promise<Author | undefined> {
		const author = await this._prisma.author.findFirst({
			where: {
				email: email.value,
			},
		});
		if (author) {
			return new Author(
				new AuthorId(author.id),
				new AuthorName(author.name),
				new AuthorEmail(author.email),
				new AuthorPassword(author.password),
				new AuthorAge(author.age),
			);
		}
		return undefined;
	}
}
