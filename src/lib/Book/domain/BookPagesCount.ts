export class BookPagesCount {
  private _value: number;
  constructor(pagesCount: number) {
    this._value = pagesCount;
    this.ensurePagesCount(pagesCount);
  }
  ensurePagesCount(pagesCount: number): void {
    if (!pagesCount) {
      throw new Error('Pages count must be provided');
    }
    if (pagesCount <= 0) {
      throw new Error('Pages count must be greater than 0');
    }
  }
  get value(): number {
    return this._value;
  }
  set value(pagesCount: number) {
    this.ensurePagesCount(pagesCount);
    this._value = pagesCount;
  }
}
