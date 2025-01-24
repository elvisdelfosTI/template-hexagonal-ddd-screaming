import { AuthEmail } from '../AuthEmail';
import { AuthId } from '../AuthId';
import { AuthorName } from '../AuthorName';
export class Auth {
  constructor(
    private email: AuthEmail,
    private id: AuthId,
    private name: AuthorName,
  ) {}

  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
    };
  }
}
