"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorDelete = void 0;
const AuthorId_1 = require("../../../domain/AuthorId");
class AuthorDelete {
    _repository;
    constructor(_repository) {
        this._repository = _repository;
    }
    async execute(id) {
        const authorId = new AuthorId_1.AuthorId(id);
        await this._repository.delete(authorId);
    }
}
exports.AuthorDelete = AuthorDelete;
