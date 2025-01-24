"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorGetById = void 0;
const AuthorId_1 = require("../../../domain/AuthorId");
const AuthorNotFoundError_1 = require("../../../domain/errors/AuthorNotFoundError");
class AuthorGetById {
    _repository;
    constructor(_repository) {
        this._repository = _repository;
    }
    async execute(id) {
        const Author = await this._repository.getById(new AuthorId_1.AuthorId(id));
        if (!Author)
            throw new AuthorNotFoundError_1.AuthorNotFoundError('Author not found');
        return Author;
    }
}
exports.AuthorGetById = AuthorGetById;
