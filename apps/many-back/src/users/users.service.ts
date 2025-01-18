import { UserDto } from './dto/user-create.dto'

import { PrismaService } from '../database/prisma.service'
import { AuthDto } from '../auth/dto/create-auth.dto'
import { Injectable } from '@nestjs/common'
import { Users } from 'db/prisma/client'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: AuthDto): Promise<Users> {
		return await this.prisma.users.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: dto.password,
			},
		})
	}

	async findByEmail(email: string): Promise<Users> {
		return await this.prisma.users.findUnique({ where: { email } })
	}

	async findById(id: number) {
		// return this.prisma.user.findFirst({ where: { id } })
	}

	async findUniqueUser(userId: number): Promise<Users> {
		return await this.prisma.users.findUnique({ where: { id: userId } })
	}

	async logout(userId: number) {
		await this.prisma.users.updateMany({
			data: { refresh_token: null },
			where: {
				id: userId,
				refresh_token: {
					not: null,
				},
			},
		})
	}

	async updateRefresh(userId: number, refresh_hash: string) {
		await this.prisma.users.update({
			data: {
				refresh_token: refresh_hash,
			},
			where: {
				id: userId,
			},
		})
	}
}
