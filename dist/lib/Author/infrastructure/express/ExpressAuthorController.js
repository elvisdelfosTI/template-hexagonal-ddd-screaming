"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAuthorController = void 0;
const serviceContainer_1 = __importDefault(require("../../../shared/infrastructure/serviceContainer"));
const AuthorNotFoundError_1 = require("../../domain/AuthorNotFoundError");
class ExpressAuthorController {
    getAll(_, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Author = yield serviceContainer_1.default.AuthorService.getAll.handler();
                res.json(Author).status(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Author = yield serviceContainer_1.default.AuthorService.getById.handler(parseInt(req.params.id));
                res.json(Author).status(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
    save(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Author = yield serviceContainer_1.default.AuthorService.save.handler(request.body.id, request.body.name, request.body.password, request.body.email);
                res.json(Author).status(201);
            }
            catch (error) {
                if (error instanceof AuthorNotFoundError_1.AuthorNotFoundError) {
                    res.status(404).json({ error: error.message });
                }
                next(error);
            }
        });
    }
}
exports.ExpressAuthorController = ExpressAuthorController;
