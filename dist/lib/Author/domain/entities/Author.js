"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
class Author {
    id;
    name;
    age;
    email;
    password;
    constructor(id, name, email, password, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }
    nameAndEmail() {
        return `${this.name} - ${this.email}`;
    }
    mapToPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
            age: this.age.value,
        };
    }
    mapToPrimitivesWithoutPassword() {
        return {
            id: this.id.value,
            name: this.name.value,
            age: this.age.value,
            email: this.email.value,
        };
    }
}
exports.Author = Author;
