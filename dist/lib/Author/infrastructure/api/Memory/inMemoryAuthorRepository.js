"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAuthorRepository = void 0;
class InMemoryAuthorRepository {
    getByEmail(_email) {
        throw new Error('Method not implemented.');
    }
    Authors = [];
    save(author) {
        this.Authors.push(author);
        return Promise.resolve();
    }
    getAll() {
        const listAuthor = this.Authors.filter((author) => author);
        return Promise.resolve(listAuthor);
    }
    getById(id) {
        return Promise.resolve(this.Authors.find((u) => u.id.value === id.value));
    }
    edit(_author) {
        console.log('Method not implemented.');
        throw new Error(`Method not implemented`);
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
