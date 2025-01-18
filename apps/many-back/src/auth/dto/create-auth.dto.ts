import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
	@IsNotEmpty()
	@IsEmail()
	email: string
	@IsString()
	name?: string
	@IsNotEmpty()
	@IsString()
	password: string
}
