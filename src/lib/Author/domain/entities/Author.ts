import type { AuthorAge } from '../AuthorAge';
import type { AuthorEmail } from '../AuthorEmail';
import type { AuthorId } from '../AuthorId';
import type { AuthorName } from '../AuthorName';
import type { AuthorPassword } from '../AuthorPassword';

export class Author {
  id: AuthorId;
  name: AuthorName;
  age: AuthorAge;
  email: AuthorEmail;
  password: AuthorPassword;

  constructor(
    id: AuthorId,
    name: AuthorName,
    email: AuthorEmail,
    password: AuthorPassword,
    age: AuthorAge,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
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
      age: this.age.value,
    };
  }
  public mapToPrimitivesWithoutPassword() {
    return {
      id: this.id.value,
      name: this.name.value,
      age: this.age.value,
      email: this.email.value,
    };
  }
}
