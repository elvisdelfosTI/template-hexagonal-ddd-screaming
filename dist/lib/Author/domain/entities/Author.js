export class Author {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
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
        };
    }
}
