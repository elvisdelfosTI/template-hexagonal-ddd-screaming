import { AuthTokenDto } from '../../lib/Auth/domain/AuthTokenDTO';
import { Auth } from '../../lib/Auth/domain/entities/Auth';
import { IAuthRepository } from '../../lib/Auth/domain/AuthRepository';
import jsonwebtoken from 'jsonwebtoken';
import { ILogObj, Logger } from 'tslog';
const log: Logger<ILogObj> = new Logger();

export class JwtCommon implements IAuthRepository {
  constructor() {}

  async verify(token: AuthTokenDto): Promise<string> {
    try {
      const decoded = jsonwebtoken.verify(
        token.value,
        process.env.API_JWT_SECRET || 'SECRET',
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
        process.env.API_JWT_SECRET || 'SECRET',
        {
          expiresIn: parseInt(process.env.API_JWT_EXPIRES || '5') * 3600,
        },
      );
      return new AuthTokenDto(`Bearer ${token}`);
    } catch (error) {
      log.error(error);
      throw new Error('Error al generar el token');
    }
  }
}
