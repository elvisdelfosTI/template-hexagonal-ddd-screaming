export class BookISBN {
	private _value: string;
	constructor(ISBN: string) {
		this._value = ISBN;
		this.ensureISBN(ISBN);
	}
	ensureISBN(ISBN: string): void {
		if (!ISBN) {
			throw new Error('ISBN must be provided');
		}
	}
	get value(): string {
		return this._value;
	}
	set value(ISBN: string) {
		this.ensureISBN(ISBN);
		this._value = ISBN;
	}
}
