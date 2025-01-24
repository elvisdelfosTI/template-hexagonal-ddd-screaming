"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorId = void 0;
class AuthorId {
    _value;
    constructor(id) {
        this._value = id;
        this.ensureMajorToZero();
    }
    ensureMajorToZero() {
        if (this._value < 0) {
            throw new Error('Author ID must be a positive integer');
        }
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
}
exports.AuthorId = AuthorId;
