export class AuthEmail {
  constructor(private email: string) {}

  get value(): string {
    return this.email;
  }
  set value(email: string) {
    this.email = email;
  }
}
