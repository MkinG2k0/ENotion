import { getCurrentUser } from './common/decorators/get-current-user.decorator'
import { Public } from './common/decorators/public.decorator'
import { RequestDto } from './dto/request-user.dto'
import { AtGuard } from './common/guards/at.guard'
import { RtGuard } from './common/guards/rt.guard'
import { AuthDto } from './dto/create-auth.dto'
import { AuthService } from './auth.service'

import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signin')
	@HttpCode(HttpStatus.CREATED)
	async login(@Body() dto: AuthDto): Promise<object> {
		return this.authService.signIn(dto)
	}

	@UseGuards(AtGuard)
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@getCurrentUser() user: RequestDto) {
		this.authService.logout(user.sub)
	}

	@UseGuards(RtGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshToken(@getCurrentUser() user: RequestDto) {
		const { refreshToken, sub } = user
		return this.authService.refresh(sub, refreshToken)
	}

	@Post('signup')
	@HttpCode(HttpStatus.OK)
	async register(@Body() dto: AuthDto): Promise<object> {
		return this.authService.createUser(dto)
	}
}
