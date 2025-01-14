import { Author } from '../../../domain/entities/Author';
import { AuthorEmail } from '../../../domain/AuthorEmail';
import { AuthorId } from '../../../domain/AuthorId';
import { AuthorName } from '../../../domain/AuthorName';
import { AuthorPassword } from '../../../domain/AuthorPassword';
export class AuthorSave {
    constructor(_repository) {
        this._repository = _repository;
    }
    async handler(id, name, email, password) {
        const author = new Author(new AuthorId(id), new AuthorName(name), new AuthorEmail(email), new AuthorPassword(password));
        return this._repository.save(author);
    }
}
