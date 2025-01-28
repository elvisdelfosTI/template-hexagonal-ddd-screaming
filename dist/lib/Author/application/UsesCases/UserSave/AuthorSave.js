"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorSave = void 0;
const Author_1 = require("../../../domain/entities/Author");
const AuthorEmail_1 = require("../../../domain/AuthorEmail");
const AuthorId_1 = require("../../../domain/AuthorId");
const AuthorName_1 = require("../../../domain/AuthorName");
const AuthorPassword_1 = require("../../../domain/AuthorPassword");
const AuthorAge_1 = require("../../../domain/AuthorAge");
class AuthorSave {
    _repository;
    constructor(_repository) {
        this._repository = _repository;
    }
    async execute(dto) {
        const isExist = await this._repository.getByEmail(new AuthorEmail_1.AuthorEmail(dto.email));
        if (isExist) {
            throw new Error('Author already exist');
        }
        const author = new Author_1.Author(new AuthorId_1.AuthorId(dto.id), new AuthorName_1.AuthorName(dto.name), new AuthorEmail_1.AuthorEmail(dto.email), new AuthorPassword_1.AuthorPassword(dto.password), new AuthorAge_1.AuthorAge(dto.age));
        return await this._repository.save(author);
    }
}
exports.AuthorSave = AuthorSave;
