"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAuthorController = void 0;
const tslib_1 = require("tslib");
const serviceContainer_1 = tslib_1.__importDefault(require("src/lib/shared/infrastructure/serviceContainer"));
class ExpressAuthorController {
    async getAll(_, res, next) {
        try {
            console.log('getAll');
            const authors = await serviceContainer_1.default.AuthorService.getAll.execute();
            res.json(authors.map((a) => a.mapToPrimitives())).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const Author = await serviceContainer_1.default.AuthorService.getById.execute(parseInt(req.params.id));
            res.json(Author.mapToPrimitivesWithoutPassword()).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async save(request, res, next) {
        try {
            const authorData = {
                id: request.body.id,
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                age: request.body.age,
            };
            const Author = await serviceContainer_1.default.AuthorService.save.execute(authorData);
            res.json(Author).status(201);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const author = await serviceContainer_1.default.AuthorService.update.execute(req.body);
            res.json(author).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const author = await serviceContainer_1.default.AuthorService.delete.execute(+req.params.id);
            res.json(author).status(200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ExpressAuthorController = ExpressAuthorController;
