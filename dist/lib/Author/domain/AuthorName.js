"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorName = void 0;
class AuthorName {
    _value;
    constructor(name) {
        this._value = name;
        this.ensureName(name);
    }
    ensureName(name) {
        if (name.length < 2 || name.length > 50) {
            throw new Error('Name must be between 2 and 50 characters long');
        }
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
}
exports.AuthorName = AuthorName;
