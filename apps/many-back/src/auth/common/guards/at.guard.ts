import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
	constructor() {
		super()
	}
}
