export class AuthorAge {
  private _value: number;
  constructor(age: number) {
    this._value = age;
    //this.ensureAge(age);
  }
  ensureAge(age: number): void {
    if (age < 18 || age > 100) {
      throw new Error('Age must be between 18 and 100');
    }
  }
  set value(value: number) {
    this._value = value;
  }
  get value(): number {
    return this._value;
  }
}
