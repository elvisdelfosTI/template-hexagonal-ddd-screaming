export class BookId {
  private _value: number;

  constructor(id: number) {
    this._value = id;
    this.ensureId(id);
  }

  ensureId(id: number): void {
    if (!id) {
      throw new Error('Id must be provided');
    }
  }

  get value(): number {
    return this._value;
  }
}
