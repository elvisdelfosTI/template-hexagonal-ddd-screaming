export class AuthorCreatedAt {
    constructor(createAt) {
        this.createAt = createAt;
    }
    ensureCreateAt() {
        if (this.createAt > new Date()) {
            throw new Error('Create at date cannot be in the future');
        }
    }
}
