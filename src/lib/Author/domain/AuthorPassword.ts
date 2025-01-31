export class AuthorPassword {
	private _value: string;
	constructor(password: string) {
		this._value = password;
	}

	ensurePassword(password: string): void {
		if (password.length < 8 || password.length > 20) {
			throw new Error('Password must be between 8 and 20 characters long');
		}
	}
	ensurePasswordComplexity(password: string): void {
		if (
			!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
				password,
			)
		) {
			throw new Error(
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
			);
		}
	}
	set value(value: string) {
		this._value = value;
	}
	get value(): string {
		return this._value;
	}
}
