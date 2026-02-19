import envConfig from '@/config/env.config'
import { MongooseModule } from '@nestjs/mongoose'

export const MongooseConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: envConfig.DATABASE_URI,
  }),
})
