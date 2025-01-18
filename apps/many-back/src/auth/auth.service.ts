import { AuthDto } from './dto/create-auth.dto'

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { UserDto } from '../users/dto/user-create.dto'
import { UsersService } from '../users/users.service'
import { generateTokens } from '../helpers'
import { JwtService } from '@nestjs/jwt'
import { Users } from 'db/prisma/client'
import { compare, hash } from 'bcrypt'
import { Tokens } from '../types'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService, private jwtService: JwtService) {}

	async createUser(dto: AuthDto): Promise<Tokens> {
		const userEmail = await this.userService.findByEmail(dto.email)
		if (userEmail) {
			throw new BadRequestException('Пользователь с таким email уже существует.')
		}
		const hashPassword = await hash(dto.password, 10)
		const user = await this.userService.create({ ...dto, password: hashPassword })
		return await this.handleTokens(user)
	}

	async handleTokens(user: Users): Promise<Tokens> {
		const tokens = await generateTokens(user.id, user.email, this.jwtService)
		await this.updateRtHash(user.id, tokens.refresh_token)
		return tokens
	}

	async logout(userId: number) {
		await this.userService.logout(userId)
	}

	async refresh(userId: number, refreshToken: string): Promise<Tokens> {
		const user = await this.userService.findUniqueUser(userId)

		const isRefresh = await compare(refreshToken, user.refresh_token)
		if (isRefresh) {
			return await this.handleTokens(user)
		}
	}

	async signIn(dto: AuthDto): Promise<Tokens> {
		const user = await this.userService.findByEmail(dto.email)
		const isPassword = compare(dto.password, user.password)
		if (user && isPassword) {
			return await this.handleTokens(user)
		}
	}

	async updateRtHash(userId: number, rt: string) {
		const refresh_hash = await hash(rt, 10)
		await this.userService.updateRefresh(userId, refresh_hash)
	}
}
