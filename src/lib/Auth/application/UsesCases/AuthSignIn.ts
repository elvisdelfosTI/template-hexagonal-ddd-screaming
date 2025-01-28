import { Encrypt } from '#common/encrypt/encrypt';
import { AuthInvalidCredentialsError } from '../../domain/errors/AuthInvalidCredentialsError';
import { IAuthorRepository } from '#author/domain/AuthorRepository';
import { AuthorEmail } from '#author/domain/AuthorEmail';
import { Auth } from '../../domain/entities/Auth';
import { AuthTokenDto } from '../../domain/AuthTokenDTO';
import { AuthorName } from '../../domain/AuthorName';
import { AuthId } from '../../domain/AuthId';
import { AuthEmail } from '../../domain/AuthEmail';
import { JwtCommon } from '#common/jwt/JwtCommon';

export class AuthSignIn {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(email: string, password: string): Promise<AuthTokenDto> {
    const user = await this.authorRepository.getByEmail(new AuthorEmail(email));
    if (!user) {
      throw new AuthInvalidCredentialsError();
    }
    const isCorrect = await Encrypt.comparePassword(
      password,
      user.password.value,
    );
    if (!isCorrect) {
      throw new AuthInvalidCredentialsError();
    }
    const auth = new Auth(
      new AuthEmail(user.email.value),
      new AuthId(user.id.value),
      new AuthorName(user.name.value),
    );
    const jwt = new JwtCommon();
    const token: AuthTokenDto = await jwt.generate(auth);
    return token;
  }
}
