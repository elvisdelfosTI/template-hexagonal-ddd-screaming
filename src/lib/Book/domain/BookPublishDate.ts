export class BookPublishedDate {
	_value: Date;
	constructor(publishedDate: Date) {
		this._value = publishedDate;
		this.ensurePublishedDate(publishedDate);
	}
	ensurePublishedDate(publishedDate: Date): void {
		if (!publishedDate) {
			throw new Error('Published date must be provided');
		}
		if (publishedDate > new Date()) {
			throw new Error('Published date cannot be in the future');
		}
	}
	set value(publishedDate: Date) {
		this.ensurePublishedDate(publishedDate);
		this._value = publishedDate;
	}
	get value(): Date {
		return this._value;
	}
}
