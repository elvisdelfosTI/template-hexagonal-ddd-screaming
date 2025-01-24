import {
  randEmail,
  randFirstName,
  randNumber,
  randPassword,
} from '@ngneat/falso';
import { AuthorDto } from '../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
import { AuthorId } from '../../../../src/lib/Author/domain/AuthorId';
import { Author } from '../../../../src/lib/Author/domain/entities/Author';
import { AuthorName } from '../../../../src/lib/Author/domain/AuthorName';
import { AuthorEmail } from '../../../../src/lib/Author/domain/AuthorEmail';
import { AuthorPassword } from '../../../../src/lib/Author/domain/AuthorPassword';
import { AuthorAge } from '../../../../src/lib/Author/domain/AuthorAge';
export class AuthorStub {
  static generateDTO(): AuthorDto {
    return {
      id: randNumber({ min: 1, max: 10000 }),
      name: randFirstName(),
      email: randEmail(),
      password: randPassword().toString(),
      age: randNumber({ min: 18, max: 50 }),
    };
  }

  static generate(): Author {
    return new Author(
      new AuthorId(this.generateDTO().id),
      new AuthorName(this.generateDTO().name),
      new AuthorEmail(this.generateDTO().email),
      new AuthorPassword(this.generateDTO().password),
      new AuthorAge(this.generateDTO().age),
    );
  }
}
