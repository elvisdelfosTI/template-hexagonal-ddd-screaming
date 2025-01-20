export class BookAuthorId {
  private _value: number;
  constructor(authorId: number) {
    this._value = authorId;
    this.ensureAuthorId(authorId);
  }
  ensureAuthorId(authorId: number): void {
    if (!authorId) {
      throw new Error('Author ID must be provided');
    }
  }
  get value(): number {
    return this._value;
  }
  set value(authorId: number) {
    this.ensureAuthorId(authorId);
    this._value = authorId;
  }
}
