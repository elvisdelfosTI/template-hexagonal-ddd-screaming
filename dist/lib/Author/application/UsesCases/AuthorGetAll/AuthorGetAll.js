"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorGetAll = void 0;
class AuthorGetAll {
    authorRepository;
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }
    async execute() {
        return this.authorRepository.getAll();
    }
}
exports.AuthorGetAll = AuthorGetAll;
