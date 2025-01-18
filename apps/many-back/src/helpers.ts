import { Tokens } from './types'

import { JwtService } from '@nestjs/jwt'

export const generateTokens = async (
	userId: number,
	email: string,
	jwtService: JwtService,
): Promise<Tokens> => {
	const [at, rt] = await Promise.all([
		jwtService.signAsync(
			{
				email,
				sub: userId,
			},
			{ expiresIn: 60 * 15, secret: 'at-secret' },
		),
		jwtService.signAsync(
			{
				email,
				sub: userId,
			},
			{ expiresIn: 60 * 60 * 24 * 7, secret: 'rt-secret' },
		),
	])
	return { access_token: at, refresh_token: rt }
}
