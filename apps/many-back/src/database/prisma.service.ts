import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'db'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}

	async onModuleInit() {
		await this.$connect()
	}
}
