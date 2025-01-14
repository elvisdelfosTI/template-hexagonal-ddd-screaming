export class AuthorId {
  value: number;
  constructor(id: number) {
    this.value = id;
    this.ensureMajorToZero();
  }
  private ensureMajorToZero() {
    if (this.value < 0) {
      throw new Error('Author ID must be a positive integer');
    }
  }
}
