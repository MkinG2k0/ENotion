import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			passReqToCallback: true,
			secretOrKey: 'rt-secret',
		})
	}

	validate(req: Request, payload) {
		const refreshToken = req.get('authorization').replace('Bearer', '').trim()
		return { ...payload, refreshToken }
	}
}
