import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import envConfig from '@/config/env.config'
import { green } from 'colorette'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  })
  app.enableCors()
  // app.use(helmet())
  console.log(green('🚀 Nest application successfully started'))
  await app.listen(envConfig.PORT ?? 3000)
}
bootstrap()
