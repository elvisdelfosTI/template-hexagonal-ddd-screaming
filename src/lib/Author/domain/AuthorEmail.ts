export class AuthorEmail {
  private _value: string;
  constructor(email: string) {
    this._value = email;
  }
  ensureName(email: string): void {
    if (email.length < 2 || email.length > 50) {
      throw new Error('Name must be between 2 and 50 characters long');
    }
  }
  ensureEmail(email: string): void {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      throw new Error('Invalid email address');
    }
  }
  get value(): string {
    return this._value;
  }
}
