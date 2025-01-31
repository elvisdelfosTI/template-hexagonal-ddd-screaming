export class AuthorName {
	constructor(private name: string) {}

	get value(): string {
		return this.name;
	}
	set value(name: string) {
		this.name = name;
	}
}
