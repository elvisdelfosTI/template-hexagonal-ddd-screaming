"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PrismaAuthorRepository_1 = require("@author/infrastructure/database/PrismaAuthorRepository");
const AuthorById_1 = require("@author/application/UsesCases/AuthorById/AuthorById");
const AuthorDelete_1 = require("../../Author/application/UsesCases/AuthorDelete/AuthorDelete");
const AuthorGetAll_1 = require("../../Author/application/UsesCases/AuthorGetAll/AuthorGetAll");
const AuthorSave_1 = require("../../Author/application/UsesCases/UserSave/AuthorSave");
const prisma_1 = require("../../../prisma");
const AuthorByEmail_1 = require("../../Author/application/UsesCases/AuthorByEmail/AuthorByEmail");
const BookGetAll_1 = require("@book/application/UsesCases/BookGetAll/BookGetAll");
const PrismaBookRepository_1 = require("../../Book/infrastructure/database/PrismaBookRepository");
const BookGetById_1 = require("../../Book/application/UsesCases/BookGetById/BookGetById");
const BookSave_1 = require("../../Book/application/UsesCases/BookSave/BookSave");
const BookDelete_1 = require("../../Book/application/UsesCases/BookDelete/BookDelete");
const AuthSignIn_1 = require("../../Auth/application/UsesCases/AuthSignIn");
const AuthorEdit_1 = require("../../Author/application/UsesCases/AuthorEdit/AuthorEdit");
const BookEdit_1 = require("../../Book/application/UsesCases/BookEdit/BookEdit");
const AuthorRepository = new PrismaAuthorRepository_1.PrismaAuthorRepository(prisma_1.prismaClient);
const BookRepository = new PrismaBookRepository_1.PrismaBookRepository(prisma_1.prismaClient);
exports.default = {
    AuthorService: {
        getAll: new AuthorGetAll_1.AuthorGetAll(AuthorRepository),
        getById: new AuthorById_1.AuthorGetById(AuthorRepository),
        save: new AuthorSave_1.AuthorSave(AuthorRepository),
        delete: new AuthorDelete_1.AuthorDelete(AuthorRepository),
        getByEmail: new AuthorByEmail_1.AuthorGetByEmail(AuthorRepository),
        update: new AuthorEdit_1.AuthorEdit(AuthorRepository),
    },
    BookService: {
        getAll: new BookGetAll_1.BookGetAll(BookRepository),
        getById: new BookGetById_1.BookGetById(BookRepository),
        save: new BookSave_1.BookSave(BookRepository),
        delete: new BookDelete_1.BookDelete(BookRepository),
        update: new BookEdit_1.BookEdit(BookRepository),
    },
    AuthenticationService: {
        login: new AuthSignIn_1.AuthSignIn(AuthorRepository),
    },
};
