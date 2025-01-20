export class BookTitle {
  private _value: string;
  constructor(title: string) {
    this._value = title;
    this.ensureTitle(title);
  }
  ensureTitle(title: string): void {
    if (!title) {
      throw new Error('Title must be provided');
    }
  }
  get value(): string {
    return this._value;
  }
  set value(title: string) {
    this.ensureTitle(title);
    this._value = title;
  }
}
