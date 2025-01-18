import { AtGuard } from './auth/common/guards/at.guard'
import { AppModule } from './app.module'

import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const PORT = process.env.PORT || 8000
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')
	// app.useGlobalGuards(new AtGuard())
	// app.useGlobalPipes(new ValidationPipe())
	await app.listen(PORT)
	console.log(`Server start on port ${PORT}`)
}

bootstrap()
