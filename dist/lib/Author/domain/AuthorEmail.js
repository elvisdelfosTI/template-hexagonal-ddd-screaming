"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorEmail = void 0;
class AuthorEmail {
    _value;
    constructor(email) {
        this._value = email;
    }
    ensureName(email) {
        if (email.length < 2 || email.length > 50) {
            throw new Error('Name must be between 2 and 50 characters long');
        }
    }
    ensureEmail(email) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error('Invalid email address');
        }
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
}
exports.AuthorEmail = AuthorEmail;
