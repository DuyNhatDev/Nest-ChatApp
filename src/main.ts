import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import envConfig from '@/config/env.config'
import { green } from 'colorette'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  })
  app.enableCors({
    origin: envConfig.CLIENT_URL,
    credentials: true,
  })
  app.setGlobalPrefix('api')
  app.use(helmet())
  app.use(cookieParser())
  console.log(green('🚀 Nest application successfully started'))
  await app.listen(envConfig.PORT ?? 3000)
}
bootstrap()
