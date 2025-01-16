export class AuthorName {
  private _value: string;
  constructor(name: string) {
    this._value = name;
    this.ensureName(name);
  }
  ensureName(name: string): void {
    if (name.length < 2 || name.length > 50) {
      throw new Error('Name must be between 2 and 50 characters long');
    }
  }
  get value(): string {
    return this._value;
  }
}
