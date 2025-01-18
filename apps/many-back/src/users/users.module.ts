import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { PrismaModule } from '../database/prisma.module'
import { Module } from '@nestjs/common'

@Module({
	controllers: [UsersController],
	exports: [UsersService],
	imports: [PrismaModule],
	providers: [UsersService],
})
export class UsersModule {}
