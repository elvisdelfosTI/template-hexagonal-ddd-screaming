export class AuthorId {
  private _value: number;
  constructor(id: number) {
    this._value = id;
    this.ensureMajorToZero();
  }
  private ensureMajorToZero() {
    if (this._value < 0) {
      throw new Error('Author ID must be a positive integer');
    }
  }

  get value(): number {
    return this._value;
  }
}
