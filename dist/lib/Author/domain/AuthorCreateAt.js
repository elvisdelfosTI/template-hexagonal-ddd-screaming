"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorCreatedAt = void 0;
class AuthorCreatedAt {
    createAt;
    constructor(createAt) {
        this.createAt = createAt;
    }
    ensureCreateAt() {
        if (this.createAt > new Date()) {
            throw new Error('Create at date cannot be in the future');
        }
    }
}
exports.AuthorCreatedAt = AuthorCreatedAt;
