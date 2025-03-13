export class AuthId {
  constructor(private id: number) {}

  get value(): number {
    return this.id;
  }
  set value(id: number) {
    this.id = id;
  }
}
