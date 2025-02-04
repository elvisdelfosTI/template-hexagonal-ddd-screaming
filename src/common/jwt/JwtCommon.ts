import jsonwebtoken from 'jsonwebtoken';
import { type ILogObj, Logger } from 'tslog';
import type { IAuthRepository } from '../../lib/Auth/domain/AuthRepository';
import { AuthTokenDto } from '../../lib/Auth/domain/AuthTokenDTO';
import type { Auth } from '../../lib/Auth/domain/entities/Auth';
const log: Logger<ILogObj> = new Logger();

export class JwtCommon implements IAuthRepository {
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
					expiresIn: Number.parseInt(process.env.API_JWT_EXPIRES || '5') * 3600,
				},
			);
			return new AuthTokenDto(`Bearer ${token}`);
		} catch (error) {
			log.error(error);
			throw new Error('Error al generar el token');
		}
	}
}
