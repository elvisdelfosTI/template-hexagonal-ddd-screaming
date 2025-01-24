import { AuthTokenDto } from './AuthTokenDTO';
import { Auth } from './entities/Auth';

export interface IAuthRepository {
  verify(token: AuthTokenDto): Promise<string | undefined>;
  generate(auth: Auth): Promise<AuthTokenDto|undefined>;
}
