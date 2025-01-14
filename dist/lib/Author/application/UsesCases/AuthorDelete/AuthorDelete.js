import { AuthorId } from '../../../domain/AuthorId';
export class AuthorDelete {
    constructor(_repository) {
        this._repository = _repository;
    }
    async handler(id) {
        return this._repository.delete(new AuthorId(id));
    }
}
