import type { IAuthRepository } from '@auth/domain/AuthRepository';
import { AuthTokenDto } from '@auth/domain/AuthTokenDTO';
import type { Auth } from '@auth/domain/entities/Auth';
import { config } from '@config/Environment.config';
import jsonwebtoken from 'jsonwebtoken';
import { type ILogObj, Logger } from 'tslog';
const log: Logger<ILogObj> = new Logger();

export class JwtCommon implements IAuthRepository {
  async verify(token: AuthTokenDto): Promise<string> {
    try {
      const decoded = jsonwebtoken.verify(
        token.value,
        config.ARCHETYPE_HEXAGONAL_API_JWT_SECRET,
      );
      return decoded as string;
    } catch (error) {
      log.error(error);
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        throw new Error('Token expired');
      }
      throw new Error('Token invalid');
    }
  }

  async generate(auth: Auth): Promise<AuthTokenDto> {
    try {
      const token = jsonwebtoken.sign(
        {
          data: auth.mapToPrimitives(),
        },
        config.ARCHETYPE_HEXAGONAL_API_JWT_SECRET,
        {
          expiresIn:
            Number.parseInt(config.ARCHETYPE_HEXAGONAL_API_JWT_EXPIRES || '5') *
            3600,
        },
      );
      return new AuthTokenDto(`Bearer ${token}`);
    } catch (error) {
      log.error(error);
      throw new Error('Error al generar el token');
    }
  }
}
