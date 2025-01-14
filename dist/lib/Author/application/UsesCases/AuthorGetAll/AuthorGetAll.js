export class AuthorGetAll {
    constructor(_repository) {
        this._repository = _repository;
    }
    async handler() {
        return this._repository.getAll();
    }
}
