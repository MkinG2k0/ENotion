import { RtStrategy } from './strategy/rt.strategy'
import { AtStrategy } from './strategy/at.strategy'

import { PrismaModule } from '../database/prisma.module'
import { UsersService } from '../users/users.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { Module } from '@nestjs/common'

@Module({
	controllers: [],
	imports: [PrismaModule, UsersModule, JwtModule.register({})],
	providers: [UsersService, AtStrategy, RtStrategy],
})
export class AuthModule {}
