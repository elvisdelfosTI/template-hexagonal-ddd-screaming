import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtCommon } from '#common/jwt/JwtCommon';
import { AuthTokenDto } from '#auth/domain/AuthTokenDTO';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const header = req.header('Authorization') || '';
		const token = header.split(' ')[1];

		if (!token) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: 'Token not provided' });
			return;
		}

		const jwt = new JwtCommon();
		try {
			await jwt.verify(new AuthTokenDto(token));
			next();
		} catch (error) {
			if (error instanceof Error && error.message === 'Token expired') {
				res.status(StatusCodes.FORBIDDEN).json({ message: 'Token expired' });
				return;
			}
			throw error;
		}
	} catch (error) {
		next(error);
	}
};
