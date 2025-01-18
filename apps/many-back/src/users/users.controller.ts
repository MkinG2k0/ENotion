import { UserDto } from './dto/user-create.dto'
import { UsersService } from './users.service'

import { Body, Controller, Get } from '@nestjs/common'

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('all')
	async signUp(@Body() dto: UserDto) {
		return 'hello'
		// return await this.userService.create(dto)
	}
}
