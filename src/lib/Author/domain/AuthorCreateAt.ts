export class AuthorCreatedAt {
	createAt: Date;
	constructor(createAt: Date) {
		this.createAt = createAt;
	}
	ensureCreateAt(): void {
		if (this.createAt > new Date()) {
			throw new Error('Create at date cannot be in the future');
		}
	}
}
