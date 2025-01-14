import { AuthorEmail } from '../../domain/AuthorEmail';
import { AuthorId } from '../../domain/AuthorId';
import { AuthorName } from '../../domain/AuthorName';
import { AuthorPassword } from '../../domain/AuthorPassword';
import { Author } from '../../domain/entities/Author';
export class PrismaAuthorRepository {
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    getById(id) {
        throw new Error('Method not implemented.');
    }
    edit(id) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
    async save(author) {
        await this._prisma.author.create({
            data: {
                id: author.id.value,
                name: author.name.value,
                email: author.email.value,
                password: author.password.value,
            },
        });
    }
    async getAll() {
        const authors = await this._prisma.author.findMany();
        return authors.map((author) => new Author(new AuthorId(author.id), new AuthorName(author.name), new AuthorEmail(author.email), new AuthorPassword(author.password)));
    }
}
