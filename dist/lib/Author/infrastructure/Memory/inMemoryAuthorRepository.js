"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAuthorRepository = void 0;
class InMemoryAuthorRepository {
    constructor() {
        this.Authors = [];
    }
    save(author) {
        this.Authors.push(author);
        return Promise.resolve();
    }
    getAll() {
        //const listAuthor:Author[] = this.Authors.map((author: Author) => (author));
        const listAuthor = this.Authors.filter((author) => author);
        return Promise.resolve(listAuthor);
    }
    getById(id) {
        console.log(id);
        return Promise.resolve(this.Authors.find((u) => u.id.value === id.value));
    }
    edit(id) {
        console.log('Method not implemented.');
        console.log(id);
        throw new Error(`Method not implemented.${id}`);
    }
    delete(id) {
        const index = this.Authors.findIndex((Author) => Author.id.value === id.value);
        if (index !== -1) {
            const [deletedAuthor] = this.Authors.splice(index, 1);
            return Promise.resolve(deletedAuthor);
        }
        return Promise.resolve(undefined);
    }
}
exports.InMemoryAuthorRepository = InMemoryAuthorRepository;
