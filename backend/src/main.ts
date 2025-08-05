import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())

	app.enableCors({
		origin: process.env.CLIENT_URL,
		credentials: true
	})

	await app.listen(process.env.PORT ?? 3000)
	console.log(`App is running on http://localhost:${process.env.PORT}`)
}
bootstrap()
