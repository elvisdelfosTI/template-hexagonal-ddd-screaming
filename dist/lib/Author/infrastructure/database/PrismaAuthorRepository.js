"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAuthorRepository = void 0;
const encrypt_1 = require("@common/encrypt/encrypt");
const AuthorAge_1 = require("@author/domain/AuthorAge");
const AuthorEmail_1 = require("@author/domain/AuthorEmail");
const AuthorId_1 = require("../../domain/AuthorId");
const AuthorName_1 = require("../../domain/AuthorName");
const AuthorPassword_1 = require("../../domain/AuthorPassword");
const Author_1 = require("../../domain/entities/Author");
class PrismaAuthorRepository {
    _prisma;
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    async getById(_id) {
        const author = await this._prisma.author.findUnique({
            where: {
                id: _id.value,
            },
        });
        if (author) {
            return new Author_1.Author(new AuthorId_1.AuthorId(author.id), new AuthorName_1.AuthorName(author.name), new AuthorEmail_1.AuthorEmail(author.email), new AuthorPassword_1.AuthorPassword(author.password), new AuthorAge_1.AuthorAge(author.age));
        }
        return undefined;
    }
    async edit(_author) {
        const author = await this._prisma.author.update({
            where: {
                id: _author.id.value,
            },
            data: {
                name: _author.name.value,
                email: _author.email.value,
                password: await encrypt_1.Encrypt.encryptPassword(_author.password.value),
                age: _author.age.value,
            },
        });
        if (author) {
            return new Author_1.Author(new AuthorId_1.AuthorId(author.id), new AuthorName_1.AuthorName(author.name), new AuthorEmail_1.AuthorEmail(author.email), new AuthorPassword_1.AuthorPassword(author.password), new AuthorAge_1.AuthorAge(author.age));
        }
        return undefined;
    }
    async delete(_id) {
        const author = await this._prisma.author.delete({
            where: {
                id: _id.value,
            },
        });
        if (author) {
            return new Author_1.Author(new AuthorId_1.AuthorId(author.id), new AuthorName_1.AuthorName(author.name), new AuthorEmail_1.AuthorEmail(author.email), new AuthorPassword_1.AuthorPassword(author.password), new AuthorAge_1.AuthorAge(author.age));
        }
        return undefined;
    }
    async save(author) {
        const response = await this._prisma.author.create({
            data: {
                id: author.id.value,
                name: author.name.value,
                email: author.email.value,
                password: await encrypt_1.Encrypt.encryptPassword(author.password.value),
                age: author.age.value,
            },
        });
        return response.id;
    }
    async getAll() {
        const authors = await this._prisma.author.findMany();
        return authors.map((author) => new Author_1.Author(new AuthorId_1.AuthorId(author.id), new AuthorName_1.AuthorName(author.name), new AuthorEmail_1.AuthorEmail(author.email), new AuthorPassword_1.AuthorPassword(author.password), new AuthorAge_1.AuthorAge(author.age)));
    }
    async getByEmail(email) {
        const author = await this._prisma.author.findUnique({
            where: {
                email: email.value,
            },
        });
        if (author) {
            return new Author_1.Author(new AuthorId_1.AuthorId(author.id), new AuthorName_1.AuthorName(author.name), new AuthorEmail_1.AuthorEmail(author.email), new AuthorPassword_1.AuthorPassword(author.password), new AuthorAge_1.AuthorAge(author.age));
        }
        return undefined;
    }
}
exports.PrismaAuthorRepository = PrismaAuthorRepository;
