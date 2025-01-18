import { PrismaService } from './database/prisma.service'
import { AuthController } from './auth/auth.controller'
import { UsersModule } from './users/users.module'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'

import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

@Module({
	controllers: [AuthController],
	imports: [ConfigModule.forRoot(), UsersModule, AuthModule],
	providers: [PrismaService, AuthService, JwtService],
})
export class AppModule {}
