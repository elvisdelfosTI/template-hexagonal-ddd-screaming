import {
  randEmail,
  randFirstName,
  randNumber,
  randPassword,
} from '@ngneat/falso';
import { AuthorDto } from '../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
export class AuthorStub {
  static generate(): AuthorDto {
    return {
      id: randNumber({ min: 1, max: 1000 }),
      name: randFirstName(),
      email: randEmail(),
      password: randPassword().toString(),
      age: randNumber({ min: 18, max: 50 }),
    };
  }
}
