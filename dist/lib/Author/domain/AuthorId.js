export class AuthorId {
    constructor(id) {
        this.value = id;
        this.ensureMajorToZero();
    }
    ensureMajorToZero() {
        if (this.value < 0) {
            throw new Error('Author ID must be a positive integer');
        }
    }
}
