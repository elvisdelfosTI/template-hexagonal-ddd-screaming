export class AuthorName {
    constructor(name) {
        this.value = name;
    }
    ensureName(name) {
        if (name.length < 2 || name.length > 50) {
            throw new Error('Name must be between 2 and 50 characters long');
        }
    }
}
