import { AuthorId } from '../../../domain/AuthorId';
import { AuthorNotFoundError } from '../../../domain/AuthorNotFoundError';
export class AuthorById {
    constructor(_repository) {
        this._repository = _repository;
    }
    async handler(id) {
        const Author = await this._repository.getById(new AuthorId(id));
        if (!Author)
            throw new AuthorNotFoundError('Author not found');
        return Author;
    }
}
