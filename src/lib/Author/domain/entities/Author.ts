import { AuthorEmail } from '../AuthorEmail';
import { AuthorId } from '../AuthorId';
import { AuthorName } from '../AuthorName';
import { AuthorPassword } from '../AuthorPassword';
import { AuthorDto } from './AuthorDto';

export class Author {
  id: AuthorId;
  name: AuthorName;
  email: AuthorEmail;
  password: AuthorPassword;

  constructor(
    id: AuthorId,
    name: AuthorName,
    email: AuthorEmail,
    password: AuthorPassword,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public nameAndEmail(): string {
    return `${this.name} - ${this.email}`;
  }
  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
