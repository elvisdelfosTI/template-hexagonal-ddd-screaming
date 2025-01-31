export class AuthTokenDto {
	constructor(private token: string) {}
	get value(): string {
		return this.token;
	}
}
